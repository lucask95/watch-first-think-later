const inProduction = process.env.NODE_ENV === "production";
const server = inProduction
  ? "https://watch-first-think-later.vercel.app"
  : "https://localhost:3000";
export default server;
