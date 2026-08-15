const fs = require("fs");
const http = require("http");
const net = require("net");
const path = require("path");
const { execFileSync, spawn } = require("child_process");
const dotenv = require("dotenv");

const backendRoot = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(backendRoot, ".env") });

const PORT = Number(process.env.PORT) || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "";
const SERVER_ENTRY = path.join(backendRoot, "dist", "server.js");

const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const isReachable = (host, port, timeoutMs = 1000) =>
  new Promise((resolve) => {
    const socket = net.connect({ host, port });
    const finish = (ok) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(ok);
    };

    socket.setTimeout(timeoutMs);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
  });

const parseMongoAddress = (uri) => {
  try {
    const { hostname, port } = new URL(uri);
    if (!hostname) {
      return null;
    }

    return { host: hostname, port: Number(port) || 27017 };
  } catch {
    return null;
  }
};

const fetchHealth = () =>
  new Promise((resolve) => {
    const req = http.get(
      {
        host: "127.0.0.1",
        port: PORT,
        path: "/api/health",
        timeout: 1000,
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          try {
            const payload = JSON.parse(body);
            resolve(
              res.statusCode === 200 &&
                payload?.success === true &&
                payload?.message === "Server is running"
            );
          } catch {
            resolve(false);
          }
        });
      }
    );

    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
    req.on("error", () => resolve(false));
  });

const getListenerPids = (port) => {
  try {
    const output = execFileSync(
      "lsof",
      ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN", "-t"],
      { encoding: "utf8" }
    ).trim();

    return output
      ? [...new Set(output.split("\n").map(Number).filter(Boolean))]
      : [];
  } catch {
    return [];
  }
};

const getProcessArgs = (pid) => {
  try {
    return execFileSync("ps", ["-p", String(pid), "-o", "args="], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
};

const isOurBackendProcess = (args) => {
  const normalized = args.replace(/\\/g, "/");
  return (
    normalized.includes("dist/server.js") ||
    normalized.includes("src/server.ts")
  );
};

const stopPid = (pid) => {
  try {
    process.kill(pid, "SIGTERM");
  } catch {
    return;
  }
};

const waitUntilPortFree = async (timeoutMs = 5000) => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (!(await isReachable("127.0.0.1", PORT, 250))) {
      return true;
    }

    await wait(100);
  }

  return !(await isReachable("127.0.0.1", PORT, 250));
};

const runServer = () => {
  if (!fs.existsSync(SERVER_ENTRY)) {
    console.error("dist/server.js was not found. Run npm run build first.");
    process.exit(1);
  }

  const child = spawn(process.execPath, [SERVER_ENTRY], {
    cwd: backendRoot,
    stdio: "inherit",
  });

  const forward = (signal) => {
    if (!child.killed) {
      child.kill(signal);
    }
  };

  process.on("SIGINT", () => forward("SIGINT"));
  process.on("SIGTERM", () => forward("SIGTERM"));

  child.on("exit", (code, signal) => {
    if (signal) {
      process.exit(0);
      return;
    }

    process.exit(code ?? 1);
  });
};

const start = async () => {
  const mongo = parseMongoAddress(MONGODB_URI);
  if (!mongo) {
    console.error("MONGODB_URI is not defined");
    process.exit(1);
  }

  if (!(await isReachable(mongo.host, mongo.port))) {
    console.error(`MongoDB is not available at ${mongo.host}:${mongo.port}`);
    process.exit(1);
  }

  const portInUse = await isReachable("127.0.0.1", PORT);
  if (portInUse) {
    const isOurBackend = await fetchHealth();
    const listenerPids = getListenerPids(PORT).filter(
      (pid) => pid !== process.pid
    );
    const ourPids = listenerPids.filter((pid) =>
      isOurBackendProcess(getProcessArgs(pid))
    );

    if (isOurBackend || ourPids.length > 0) {
      for (const pid of ourPids.length ? ourPids : listenerPids) {
        stopPid(pid);
      }

      const freed = await waitUntilPortFree();
      if (!freed) {
        console.error(
          `Could not free port ${PORT}. Stop the existing backend process and try again.`
        );
        process.exit(1);
      }
    } else {
      console.error(
        `Port ${PORT} is already in use by another process. Stop that process or set PORT in backend/.env.`
      );
      process.exit(1);
    }
  }

  runServer();
};

start().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
