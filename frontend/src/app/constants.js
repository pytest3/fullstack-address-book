export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://addressbookapp-holy-violet-9908.fly.dev"
    : "http://localhost:3000";
