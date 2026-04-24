import { fileURLToPath } from "url"
import { dirname, resolve } from "path"
import dotenv from "dotenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: resolve(__dirname, "../.env") })

import http from "http"
import { app } from './app.js'
import { initWebSocket } from './lib/websocket.js'

const server = http.createServer(app)

// Initialize WebSocket
initWebSocket(server)

const PORT = process.env.PORT || 3000

try {
    server.listen(PORT, () => {
        console.log(`⚙️  Server is running at port: ${PORT}`)
        console.log(`🔌 WebSocket ready`)
        console.log(`🅿️  Smart Parking System API`)
        console.log(`   → http://localhost:${PORT}`)
    })
} catch (error) {
    console.error("Failed to start server:", error);
}