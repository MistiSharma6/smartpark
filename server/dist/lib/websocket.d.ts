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
export declare function initWebSocket(httpServer: HTTPServer): SocketServer;
export declare function getIO(): SocketServer;
//# sourceMappingURL=websocket.d.ts.map