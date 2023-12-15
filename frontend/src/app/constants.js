export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://fullstack-address-book.vercel.app"
    : "http://localhost:3000";
