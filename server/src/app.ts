import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { globalErrorHandler } from "./middlewares/errorHandler.js"

const app = express()

// Support comma-separated CORS origins for multi-environment deployments
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map(o => o.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true
}))

app.use(express.json({limit: "5mb"}))
app.use(express.urlencoded({extended: true, limit: "5mb"}))
app.use(express.static("public"))
app.use(cookieParser())


// ── Route imports ────────────────────────────────────────────
import userRouter from './routes/user.routes.js'
import otpRouter from './routes/otp.routes.js'
import parkingRouter from './routes/parking.routes.js'
import slotRouter from './routes/slot.routes.js'
import vehicleRouter from './routes/vehicle.routes.js'
import analyticsRouter from './routes/analytics.routes.js'
import lotRouter from './routes/lot.routes.js'
import bookingRouter from './routes/booking.routes.js'


// ── Route declarations ──────────────────────────────────────
app.use("/api/v1/users", userRouter)
app.use("/api/v1/otp", otpRouter)
app.use("/api/v1/parking", parkingRouter)
app.use("/api/v1/slots", slotRouter)
app.use("/api/v1/vehicles", vehicleRouter)
app.use("/api/v1/analytics", analyticsRouter)
app.use("/api/v1/lots", lotRouter)
app.use("/api/v1/bookings", bookingRouter)

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "🅿️ Smart Parking System API is running",
    endpoints: {
      users: "/api/v1/users",
      parking: "/api/v1/parking",
      slots: "/api/v1/slots",
      vehicles: "/api/v1/vehicles",
      analytics: "/api/v1/analytics",
      lots: "/api/v1/lots",
      bookings: "/api/v1/bookings",
    },
  });
});

// ── Global Error Handler (must be LAST) ──────────────────────
app.use(globalErrorHandler as any)

export { app }