import express from "express";
import http from "http";
import cors from "cors";
import AppRouter from "./backend/routes/Router.js";

const app = express();
const server = http.createServer(app);

// Middleware for HTTP server
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup routes for HTTP
const appRouter = new AppRouter();
app.use("/api", appRouter.getRouter());

// Start HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ HTTP Server running on port ${PORT}`);
});

// The WebSocket server upgrade handling is already included in the WebSocketService constructor
