const inProduction = process.env.NODE_ENV === "production";
const server = inProduction ? "https://dontknowyet" : "https://localhost:3000";
export default server;
