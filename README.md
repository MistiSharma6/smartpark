# Smart Parking System

A full-stack smart parking platform with a React/Vite frontend, an Express/TypeScript backend, a Prisma/Postgres data layer, Socket.IO real-time updates, and ESP32 RFID hardware integration.

## Overview

- Core features: user auth + OTP, vehicles, lots and slots, bookings, live parking sessions, analytics, pathfinding, and slot allocation.
- Backend entry points: [server/src/index.ts](server/src/index.ts) and [server/src/app.ts](server/src/app.ts).
- Frontend routing: [client/src/App.tsx](client/src/App.tsx).

## Architecture

- Client: React 19 + Vite + React Router, Leaflet, Recharts. See [client/package.json](client/package.json).
- Server: Express 5, JWT auth, RBAC, Prisma, Socket.IO, Nodemailer, Multer, Cloudinary. See [server/package.json](server/package.json).
- Database: Prisma schema in [server/prisma/schema.prisma](server/prisma/schema.prisma).
- Realtime: Socket.IO room-based updates in [server/src/lib/websocket.ts](server/src/lib/websocket.ts).
- Hardware: ESP32 + RC522 RFID scanner in [hardware/rfid_scanner.ino](hardware/rfid_scanner.ino).

## Domain Engines

- Pathfinding (Dijkstra) over lot graphs: [server/src/engines/dijkstra.ts](server/src/engines/dijkstra.ts).
- Smart slot allocation (distance, floor, type, features): [server/src/engines/slotAllocator.ts](server/src/engines/slotAllocator.ts).
- Predictive analytics (moving averages): [server/src/engines/predictor.ts](server/src/engines/predictor.ts).

## Data Model

Key entities defined in [server/prisma/schema.prisma](server/prisma/schema.prisma):

- User, OTPVerification
- Vehicle
- ParkingLot, ParkingSlot
- ParkingSession
- Booking
- ParkingAnalytics

## API

Base path: `/api/v1` (client uses `http://localhost:8000/api/v1`).

### Health

- `GET /` -> API status and endpoint list

### Auth / Users (`/api/v1/users`)

- `POST /register` -> create user
- `POST /login` -> login
- `POST /logout` -> logout (JWT required)
- `POST /refresh-token` -> refresh access token
- `POST /change-password` -> change password (JWT required)
- `GET /current-user` -> current user profile (JWT required)
- `PATCH /update-account` -> update profile (JWT required)

### OTP (`/api/v1/otp`)

- `POST /verify` -> verify OTP
- `POST /resend` -> resend OTP

### Lots (`/api/v1/lots`)

- `GET /` -> list lots (public)
- `GET /:id` -> get lot (public)
- `POST /create` -> create lot (ADMIN)
- `PATCH /:id` -> update lot (ADMIN)
- `POST /:id/graph` -> upload graph/layout (ADMIN)

### Slots (`/api/v1/slots`)

- `POST /bulk-create` -> create slots in bulk (ADMIN)
- `PATCH /:id` -> update slot (ADMIN)
- `GET /lot/:lotId` -> list slots in lot (JWT required)
- `GET /stats/:lotId` -> occupancy stats (JWT required)

### Vehicles (`/api/v1/vehicles`)

- `POST /register` -> register vehicle (JWT required)
- `GET /my` -> list my vehicles (JWT required)
- `PATCH /:id` -> update vehicle (JWT required)
- `DELETE /:id` -> delete vehicle (JWT required)

### Parking (`/api/v1/parking`)

- `POST /rfid-scan` -> hardware scan (X-API-Key required)
- `GET /slot-map/:lotId` -> public slot map for display boards
- `GET /session/:vehicleId` -> active session for vehicle (JWT required)
- `GET /history` -> session history (JWT required, supports page/limit)
- `POST /manual-entry` -> admin/security entry override (JWT + ADMIN/SECURITY)
- `POST /manual-exit` -> admin/security exit override (JWT + ADMIN/SECURITY)

### Bookings (`/api/v1/bookings`)

- `POST /` -> create booking (JWT required)
- `GET /my` -> list my bookings (JWT required)
- `GET /active` -> active booking (JWT required)
- `PATCH /:id/cancel` -> cancel booking (JWT required)

### Analytics (`/api/v1/analytics`) (ADMIN only)

- `GET /occupancy/:lotId` -> occupancy history (supports `?days=`)
- `GET /peak-hours/:lotId` -> peak/quiet hours
- `GET /revenue/:lotId` -> revenue stats (supports `?days=`)
- `GET /predictions/:lotId` -> predictions (per hour)
- `GET /predictions-all/:lotId` -> predictions (full day)
- `GET /logs/:lotId` -> recent logs (supports `?limit=`)

## Frontend Routes

Defined in [client/src/App.tsx](client/src/App.tsx).

Public:

- `/` -> landing
- `/login` -> login
- `/register` -> register

Authenticated:

- `/dashboard` -> user dashboard
- `/locations` -> lot locations
- `/my-booking` -> my booking
- `/book` -> book parking
- `/map/:lotId` -> parking map
- `/vehicles` -> vehicles
- `/history` -> parking history
- `/pathfinder/:lotId` -> path visualizer

Admin:

- `/admin` -> admin dashboard
- `/analytics/:lotId` -> analytics
- `/lot-manager` -> lot manager
- `/lot-designer/:lotId` -> lot designer
- `/slot-features/:lotId` -> slot feature editor

## Realtime

Socket.IO server allows clients to join or leave a lot room:

- `join:lot` with `lotId`
- `leave:lot` with `lotId`

See [server/src/lib/websocket.ts](server/src/lib/websocket.ts).

## Hardware Integration

The ESP32 + RC522 scanner reads RFID tags and communicates directly with the backend.

### How to hit the RFID API endpoint directly from hardware

**1. The Endpoint URL**
`POST http://<YOUR_SERVER_IP>:5000/api/v1/parking/rfid-scan`
*(Replace `<YOUR_SERVER_IP>` with your actual server address or `localhost` if testing locally).*

**2. Required Headers**
You **must** send your API key in the headers under `X-API-Key`.
- `Content-Type: application/json`
- `X-API-Key: sp-hw-key-2026-demo`

**3. Required Body (JSON)**
```json
{
  "rfidTag": "THE_SCANNED_RFID_STRING",
  "lotId": "THE_ID_OF_THE_PARKING_LOT",
  "action": "ENTRY" // or "EXIT"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/v1/parking/rfid-scan \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sp-hw-key-2026-demo" \
  -d '{
    "rfidTag": "SCANNED_TAG",
    "lotId": "YOUR_LOT_ID",
    "action": "ENTRY"
  }'
```

See the Arduino code example in [hardware/rfid_scanner.ino](hardware/rfid_scanner.ino) for the complete ESP32 implementation.
