"use client";

import { Toaster } from "react-hot-toast";

const AppToaster = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--popover)",
          color: "var(--popover-foreground)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          boxShadow: "0 10px 15px -3px rgb(15 23 42 / 0.12)",
          fontSize: "0.875rem",
          fontWeight: 500,
          padding: "10px 14px",
          maxWidth: "24rem",
        },
        success: {
          iconTheme: {
            primary: "var(--primary)",
            secondary: "var(--primary-foreground)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--destructive)",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};

export default AppToaster;
