/**
 * Socket.IO WebSocket Server
 *
 * Provides real-time updates for:
 *   - Slot status changes
 *   - Session start/end events
 *   - Occupancy updates
 *   - Analytics snapshots
 */

import { Server as SocketServer } from "socket.io";
import type { Server as HTTPServer } from "http";

let io: SocketServer | null = null;

export function initWebSocket(httpServer: HTTPServer): SocketServer {
  io = new SocketServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Client joins a lot room to receive updates for that lot
    socket.on("join:lot", (lotId: string) => {
      socket.join(`lot:${lotId}`);
      console.log(`📡 Client ${socket.id} joined lot:${lotId}`);
    });

    socket.on("leave:lot", (lotId: string) => {
      socket.leave(`lot:${lotId}`);
      console.log(`📡 Client ${socket.id} left lot:${lotId}`);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  console.log("🔌 WebSocket server initialized");
  return io;
}

export function getIO(): SocketServer {
  if (!io) {
    throw new Error("WebSocket not initialized. Call initWebSocket first.");
  }
  return io;
}
