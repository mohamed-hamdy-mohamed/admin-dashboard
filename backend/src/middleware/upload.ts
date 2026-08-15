import fs from "fs";
import path from "path";
import multer from "multer";
import { AppError } from "../utils/AppError";

const uploadDir = path.join(__dirname, "../../uploads/avatars");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `${req.user?.userId}-${Date.now()}${ext}`);
  },
});

export const avatarUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!allowed.includes(file.mimetype)) {
      cb(new AppError("Avatar must be a JPEG, PNG, WebP, or GIF image", 400));
      return;
    }

    cb(null, true);
  },
});
