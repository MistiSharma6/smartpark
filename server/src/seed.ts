/**
 * Seed Script — Creates a full demo environment for SmartPark.
 *
 * Run: npx tsx src/seed.ts
 *
 * Creates:
 *   - 3 users: Admin, Security, Demo User (all pre-verified)
 *   - 1 additional test user (Jane, pre-verified) with vehicle
 *   - 3 vehicles across 2 users
 *   - 1 parking lot "Smart Park Central" with 2 floors, 24 slots
 *   - Full graph data for Dijkstra pathfinding
 *   - 1 active REGISTERED booking (demo user)
 *   - 2 completed parking sessions with billing
 *   - 1 completed booking (confirmed + completed)
 *   - 14 days of analytics data with realistic occupancy patterns
 */

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
import bcrypt from "bcrypt";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function seed() {
  console.log("🌱 Seeding database...\n");

  // ── 0. Clean existing data (reverse dependency order) ─────
  console.log("🧹 Cleaning existing data...");
  await prisma.parkingAnalytics.deleteMany();
  await prisma.parkingSession.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.oTPVerification.deleteMany();
  await prisma.parkingSlot.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.parkingLot.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Database cleaned\n");

  // ── 1. Create Users ─────────────────────────────────────────
  const adminHash = await bcrypt.hash("admin123", 10);
  const userHash = await bcrypt.hash("user123", 10);
  const securityHash = await bcrypt.hash("security123", 10);
  const janeHash = await bcrypt.hash("jane123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@smartpark.com",
      phone: "+911234567890",
      role: "ADMIN",
      verified: true,
      passwordHash: adminHash,
    },
  });
  console.log(`✅ Admin user: ${admin.email} (password: admin123)`);

  const securityUser = await prisma.user.create({
    data: {
      name: "Security Guard",
      email: "security@smartpark.com",
      phone: "+911234567891",
      role: "SECURITY",
      verified: true,
      passwordHash: securityHash,
    },
  });
  console.log(`✅ Security user: ${securityUser.email} (password: security123)`);

  const demoUser = await prisma.user.create({
    data: {
      name: "Aditya Kumar",
      email: "user@smartpark.com",
      phone: "+919876543210",
      role: "USER",
      verified: true,
      passwordHash: userHash,
    },
  });
  console.log(`✅ Demo user: ${demoUser.email} (password: user123)`);

  const janeUser = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@smartpark.com",
      phone: "+919876543211",
      role: "USER",
      verified: true,
      passwordHash: janeHash,
    },
  });
  console.log(`✅ Test user: ${janeUser.email} (password: jane123)`);

  // ── 2. Create Parking Lot ───────────────────────────────────

  // Build the graph for the parking lot layout:
  //
  //  ENTRY ── N1 ─── N2 ─── N3
  //           │      │      │
  //       A-101  A-102  A-103
  //       A-104  A-105  A-106
  //           │      │      │
  //  ──────── N4 ─── N5 ─── N6
  //           │      │      │
  //       B-101  B-102  B-103
  //       B-104  B-105  B-106
  //           │      │      │
  //  ──────── N7 ─── N8 ─── N9
  //           │      │      │
  //       C-101  C-102  C-103
  //       C-104  C-105  C-106
  //
  // Floor 2 mirrors Floor 1 with RAMP connection

  const graphData = {
    nodes: [
      // Entry
      { id: "entry", label: "Entry Gate", x: 0, y: 0 },
      // Floor 1 intersections
      { id: "n1", label: "Aisle A Start", x: 100, y: 0 },
      { id: "n2", label: "Aisle A Mid", x: 250, y: 0 },
      { id: "n3", label: "Aisle A End", x: 400, y: 0 },
      { id: "n4", label: "Aisle B Start", x: 100, y: 150 },
      { id: "n5", label: "Aisle B Mid", x: 250, y: 150 },
      { id: "n6", label: "Aisle B End", x: 400, y: 150 },
      { id: "n7", label: "Aisle C Start", x: 100, y: 300 },
      { id: "n8", label: "Aisle C Mid", x: 250, y: 300 },
      { id: "n9", label: "Aisle C End", x: 400, y: 300 },
      // Slot nodes — Floor 1 Block A
      { id: "s-A-101", label: "A-101", x: 80, y: 40 },
      { id: "s-A-102", label: "A-102", x: 230, y: 40 },
      { id: "s-A-103", label: "A-103", x: 380, y: 40 },
      { id: "s-A-104", label: "A-104", x: 80, y: 70 },
      { id: "s-A-105", label: "A-105", x: 230, y: 70 },
      { id: "s-A-106", label: "A-106", x: 380, y: 70 },
      // Slot nodes — Floor 1 Block B
      { id: "s-B-101", label: "B-101", x: 80, y: 190 },
      { id: "s-B-102", label: "B-102", x: 230, y: 190 },
      { id: "s-B-103", label: "B-103", x: 380, y: 190 },
      { id: "s-B-104", label: "B-104", x: 80, y: 220 },
      { id: "s-B-105", label: "B-105", x: 230, y: 220 },
      { id: "s-B-106", label: "B-106", x: 380, y: 220 },
      // Slot nodes — Floor 1 Block C
      { id: "s-C-101", label: "C-101", x: 80, y: 340 },
      { id: "s-C-102", label: "C-102", x: 230, y: 340 },
      { id: "s-C-103", label: "C-103", x: 380, y: 340 },
      { id: "s-C-104", label: "C-104", x: 80, y: 370 },
      { id: "s-C-105", label: "C-105", x: 230, y: 370 },
      { id: "s-C-106", label: "C-106", x: 380, y: 370 },
      // Floor 2 — Ramp and intersections
      { id: "ramp", label: "Ramp to Floor 2", x: 500, y: 150 },
      { id: "f2-n1", label: "F2 Aisle A Start", x: 100, y: 500 },
      { id: "f2-n2", label: "F2 Aisle A Mid", x: 250, y: 500 },
      { id: "f2-n3", label: "F2 Aisle A End", x: 400, y: 500 },
      // Floor 2 slot nodes — Block A
      { id: "s-A-201", label: "A-201", x: 80, y: 540 },
      { id: "s-A-202", label: "A-202", x: 230, y: 540 },
      { id: "s-A-203", label: "A-203", x: 380, y: 540 },
      { id: "s-A-204", label: "A-204", x: 80, y: 570 },
      { id: "s-A-205", label: "A-205", x: 230, y: 570 },
      { id: "s-A-206", label: "A-206", x: 380, y: 570 },
    ],
    edges: [
      // Entry to Floor 1
      { from: "entry", to: "n1", weight: 10 },
      // Floor 1 aisles
      { from: "n1", to: "n2", weight: 15 },
      { from: "n2", to: "n3", weight: 15 },
      { from: "n1", to: "n4", weight: 15 },
      { from: "n2", to: "n5", weight: 15 },
      { from: "n3", to: "n6", weight: 15 },
      { from: "n4", to: "n5", weight: 15 },
      { from: "n5", to: "n6", weight: 15 },
      { from: "n4", to: "n7", weight: 15 },
      { from: "n5", to: "n8", weight: 15 },
      { from: "n6", to: "n9", weight: 15 },
      { from: "n7", to: "n8", weight: 15 },
      { from: "n8", to: "n9", weight: 15 },
      // Slots to intersection nodes — Block A
      { from: "n1", to: "s-A-101", weight: 3 },
      { from: "n2", to: "s-A-102", weight: 3 },
      { from: "n3", to: "s-A-103", weight: 3 },
      { from: "n1", to: "s-A-104", weight: 5 },
      { from: "n2", to: "s-A-105", weight: 5 },
      { from: "n3", to: "s-A-106", weight: 5 },
      // Slots to intersection nodes — Block B
      { from: "n4", to: "s-B-101", weight: 3 },
      { from: "n5", to: "s-B-102", weight: 3 },
      { from: "n6", to: "s-B-103", weight: 3 },
      { from: "n4", to: "s-B-104", weight: 5 },
      { from: "n5", to: "s-B-105", weight: 5 },
      { from: "n6", to: "s-B-106", weight: 5 },
      // Slots to intersection nodes — Block C
      { from: "n7", to: "s-C-101", weight: 3 },
      { from: "n8", to: "s-C-102", weight: 3 },
      { from: "n9", to: "s-C-103", weight: 3 },
      { from: "n7", to: "s-C-104", weight: 5 },
      { from: "n8", to: "s-C-105", weight: 5 },
      { from: "n9", to: "s-C-106", weight: 5 },
      // Ramp connection
      { from: "n6", to: "ramp", weight: 10 },
      { from: "ramp", to: "f2-n1", weight: 20 },
      // Floor 2 aisles
      { from: "f2-n1", to: "f2-n2", weight: 15 },
      { from: "f2-n2", to: "f2-n3", weight: 15 },
      // Floor 2 slots
      { from: "f2-n1", to: "s-A-201", weight: 3 },
      { from: "f2-n2", to: "s-A-202", weight: 3 },
      { from: "f2-n3", to: "s-A-203", weight: 3 },
      { from: "f2-n1", to: "s-A-204", weight: 5 },
      { from: "f2-n2", to: "s-A-205", weight: 5 },
      { from: "f2-n3", to: "s-A-206", weight: 5 },
    ],
  };

  const lot = await prisma.parkingLot.create({
    data: {
      id: "demo-lot-1",
      name: "Smart Park Central",
      address: "123 Innovation Drive, Tech Park",
      latitude: 19.076,
      longitude: 72.8777,
      floors: 2,
      ratePerHour: 20.0,
      graphData,
      entryNodeId: "entry",
    },
  });
  console.log(`\n✅ Parking lot: ${lot.name}`);

  // ── 3. Create Slots ─────────────────────────────────────────

  const slotConfigs = [
    // Floor 1 — Block A
    { block: "A", number: 101, floor: 1, nodeId: "s-A-101", type: "REGULAR" as const, xCoord: 80, yCoord: 40, features: ["near_entry"] },
    { block: "A", number: 102, floor: 1, nodeId: "s-A-102", type: "REGULAR" as const, xCoord: 230, yCoord: 40, features: [] },
    { block: "A", number: 103, floor: 1, nodeId: "s-A-103", type: "EV_CHARGING" as const, xCoord: 380, yCoord: 40, features: ["ev_charging"] },
    { block: "A", number: 104, floor: 1, nodeId: "s-A-104", type: "REGULAR" as const, xCoord: 80, yCoord: 70, features: ["near_entry"] },
    { block: "A", number: 105, floor: 1, nodeId: "s-A-105", type: "HANDICAPPED" as const, xCoord: 230, yCoord: 70, features: ["handicapped"] },
    { block: "A", number: 106, floor: 1, nodeId: "s-A-106", type: "PREMIUM" as const, xCoord: 380, yCoord: 70, features: ["shaded", "premium"] },
    // Floor 1 — Block B
    { block: "B", number: 101, floor: 1, nodeId: "s-B-101", type: "REGULAR" as const, xCoord: 80, yCoord: 190, features: [] },
    { block: "B", number: 102, floor: 1, nodeId: "s-B-102", type: "REGULAR" as const, xCoord: 230, yCoord: 190, features: ["shaded"] },
    { block: "B", number: 103, floor: 1, nodeId: "s-B-103", type: "REGULAR" as const, xCoord: 380, yCoord: 190, features: [] },
    { block: "B", number: 104, floor: 1, nodeId: "s-B-104", type: "REGULAR" as const, xCoord: 80, yCoord: 220, features: [] },
    { block: "B", number: 105, floor: 1, nodeId: "s-B-105", type: "EV_CHARGING" as const, xCoord: 230, yCoord: 220, features: ["ev_charging"] },
    { block: "B", number: 106, floor: 1, nodeId: "s-B-106", type: "REGULAR" as const, xCoord: 380, yCoord: 220, features: [] },
    // Floor 1 — Block C
    { block: "C", number: 101, floor: 1, nodeId: "s-C-101", type: "REGULAR" as const, xCoord: 80, yCoord: 340, features: [] },
    { block: "C", number: 102, floor: 1, nodeId: "s-C-102", type: "REGULAR" as const, xCoord: 230, yCoord: 340, features: ["near_exit"] },
    { block: "C", number: 103, floor: 1, nodeId: "s-C-103", type: "PREMIUM" as const, xCoord: 380, yCoord: 340, features: ["premium", "shaded"] },
    { block: "C", number: 104, floor: 1, nodeId: "s-C-104", type: "REGULAR" as const, xCoord: 80, yCoord: 370, features: [] },
    { block: "C", number: 105, floor: 1, nodeId: "s-C-105", type: "HANDICAPPED" as const, xCoord: 230, yCoord: 370, features: ["handicapped"] },
    { block: "C", number: 106, floor: 1, nodeId: "s-C-106", type: "REGULAR" as const, xCoord: 380, yCoord: 370, features: [] },
    // Floor 2 — Block A
    { block: "A", number: 201, floor: 2, nodeId: "s-A-201", type: "REGULAR" as const, xCoord: 80, yCoord: 540, features: [] },
    { block: "A", number: 202, floor: 2, nodeId: "s-A-202", type: "REGULAR" as const, xCoord: 230, yCoord: 540, features: [] },
    { block: "A", number: 203, floor: 2, nodeId: "s-A-203", type: "EV_CHARGING" as const, xCoord: 380, yCoord: 540, features: ["ev_charging"] },
    { block: "A", number: 204, floor: 2, nodeId: "s-A-204", type: "REGULAR" as const, xCoord: 80, yCoord: 570, features: [] },
    { block: "A", number: 205, floor: 2, nodeId: "s-A-205", type: "REGULAR" as const, xCoord: 230, yCoord: 570, features: [] },
    { block: "A", number: 206, floor: 2, nodeId: "s-A-206", type: "PREMIUM" as const, xCoord: 380, yCoord: 570, features: ["premium", "shaded"] },
  ];

  // Create all slots
  const createdSlots: Record<string, string> = {}; // nodeId -> slotId mapping
  for (const config of slotConfigs) {
    const slot = await prisma.parkingSlot.create({
      data: {
        ...config,
        lotId: lot.id,
        status: "FREE",
      },
    });
    if (config.nodeId) {
      createdSlots[config.nodeId] = slot.id;
    }
  }

  // Update total slots count
  const totalSlots = await prisma.parkingSlot.count({ where: { lotId: lot.id } });
  await prisma.parkingLot.update({
    where: { id: lot.id },
    data: { totalSlots },
  });

  console.log(`✅ Created ${totalSlots} parking slots (Floor 1: 18, Floor 2: 6)`);

  // ── 4. Create Vehicles ──────────────────────────────────────

  const vehicle1 = await prisma.vehicle.create({
    data: {
      rfidTag: "RFID-DEMO-001",
      plateNo: "MH-01-AB-1234",
      ownerId: demoUser.id,
    },
  });
  console.log(`✅ Vehicle: ${vehicle1.plateNo} (RFID: ${vehicle1.rfidTag}) → ${demoUser.name}`);

  const vehicle2 = await prisma.vehicle.create({
    data: {
      rfidTag: "RFID-DEMO-002",
      plateNo: "MH-02-CD-5678",
      ownerId: demoUser.id,
    },
  });
  console.log(`✅ Vehicle: ${vehicle2.plateNo} (RFID: ${vehicle2.rfidTag}) → ${demoUser.name}`);

  const vehicle3 = await prisma.vehicle.create({
    data: {
      rfidTag: "RFID-JANE-001",
      plateNo: "KA-03-EF-9012",
      ownerId: janeUser.id,
    },
  });
  console.log(`✅ Vehicle: ${vehicle3.plateNo} (RFID: ${vehicle3.rfidTag}) → ${janeUser.name}`);

  // ── 5. Create Sample Bookings ───────────────────────────────

  console.log("\n📋 Creating sample bookings...");

  // 5a. Active REGISTERED booking for demo user (slot B-102, reserved)
  const reservedSlotId = createdSlots["s-B-102"]!;
  await prisma.parkingSlot.update({
    where: { id: reservedSlotId },
    data: { status: "RESERVED" },
  });

  const activeBooking = await prisma.booking.create({
    data: {
      userId: demoUser.id,
      lotId: lot.id,
      slotId: reservedSlotId,
      vehicleId: vehicle1.id,
      slotType: "REGULAR",
      preferences: ["shaded"],
      registered: true,
      confirmed: false,
      status: "REGISTERED",
      bookingTime: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 min from now
    },
  });
  console.log(`✅ Active booking: ${activeBooking.id} (REGISTERED, awaiting RFID confirmation)`);

  // 5b. Completed booking for Jane (was confirmed via RFID, then exited)
  const janeSlotId = createdSlots["s-A-101"]!;
  const janeBookingConfirmedAt = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 hours ago
  const janeBookingExitAt = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hour ago

  const completedBooking = await prisma.booking.create({
    data: {
      userId: janeUser.id,
      lotId: lot.id,
      slotId: janeSlotId,
      vehicleId: vehicle3.id,
      slotType: "REGULAR",
      preferences: ["near_entry"],
      registered: true,
      confirmed: true,
      confirmedAt: janeBookingConfirmedAt,
      checkedInAt: janeBookingConfirmedAt,
      status: "COMPLETED",
      bookingTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
    },
  });
  console.log(`✅ Completed booking: ${completedBooking.id} (COMPLETED, was confirmed via RFID)`);

  // 5c. A cancelled booking for demo user (history)
  const cancelledBooking = await prisma.booking.create({
    data: {
      userId: demoUser.id,
      lotId: lot.id,
      slotId: createdSlots["s-C-101"]!,
      vehicleId: vehicle2.id,
      slotType: "REGULAR",
      preferences: [],
      registered: true,
      confirmed: false,
      status: "CANCELLED",
      bookingTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
      expiresAt: new Date(Date.now() - 23.5 * 60 * 60 * 1000),
    },
  });
  console.log(`✅ Cancelled booking: ${cancelledBooking.id} (CANCELLED)`);

  // 5d. An expired booking
  const expiredBooking = await prisma.booking.create({
    data: {
      userId: janeUser.id,
      lotId: lot.id,
      slotId: createdSlots["s-B-104"]!,
      vehicleId: vehicle3.id,
      slotType: "REGULAR",
      preferences: [],
      registered: true,
      confirmed: false,
      status: "EXPIRED",
      bookingTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() - 47.5 * 60 * 60 * 1000),
    },
  });
  console.log(`✅ Expired booking: ${expiredBooking.id} (EXPIRED)`);

  // ── 6. Create Sample Parking Sessions ──────────────────────

  console.log("\n🅿️  Creating sample parking sessions...");

  // 6a. Completed session tied to Jane's completed booking
  const session1 = await prisma.parkingSession.create({
    data: {
      vehicleId: vehicle3.id,
      slotId: janeSlotId,
      bookingId: completedBooking.id,
      entryTime: janeBookingConfirmedAt,
      exitTime: janeBookingExitAt,
      duration: 120, // 2 hours
      cost: 40.0,    // 2h × ₹20/hr
      paymentStatus: "PAID",
    },
  });
  console.log(`✅ Session: ${session1.id} (Jane, 2h, ₹40, PAID)`);

  // 6b. Completed session for demo user (walk-in, no booking)
  const session2EntryTime = new Date(Date.now() - 6 * 60 * 60 * 1000); // 6h ago
  const session2ExitTime = new Date(Date.now() - 4.5 * 60 * 60 * 1000); // 4.5h ago
  const session2 = await prisma.parkingSession.create({
    data: {
      vehicleId: vehicle2.id,
      slotId: createdSlots["s-C-103"]!,
      entryTime: session2EntryTime,
      exitTime: session2ExitTime,
      duration: 90,    // 1.5 hours
      cost: 30.0,      // 1.5h × ₹20/hr
      paymentStatus: "PAID",
    },
  });
  console.log(`✅ Session: ${session2.id} (Aditya walk-in, 1.5h, ₹30, PAID)`);

  // 6c. Another completed session from 2 days ago
  const session3EntryTime = new Date(Date.now() - 50 * 60 * 60 * 1000);
  const session3ExitTime = new Date(Date.now() - 47 * 60 * 60 * 1000);
  const session3 = await prisma.parkingSession.create({
    data: {
      vehicleId: vehicle1.id,
      slotId: createdSlots["s-A-104"]!,
      entryTime: session3EntryTime,
      exitTime: session3ExitTime,
      duration: 180,   // 3 hours
      cost: 60.0,      // 3h × ₹20/hr
      paymentStatus: "PENDING",
    },
  });
  console.log(`✅ Session: ${session3.id} (Aditya, 3h, ₹60, PENDING)`);

  // ── 7. Create Sample Analytics Data ─────────────────────────

  console.log("\n📊 Creating sample analytics data...");
  const now = new Date();
  for (let day = 13; day >= 0; day--) {
    for (let hour = 6; hour <= 22; hour++) {
      const timestamp = new Date(now);
      timestamp.setDate(timestamp.getDate() - day);
      timestamp.setHours(hour, 0, 0, 0);

      // Simulate realistic occupancy patterns
      let baseOccupancy = 5;
      if (hour >= 8 && hour <= 10) baseOccupancy = 16;       // Morning rush
      else if (hour >= 11 && hour <= 14) baseOccupancy = 20;  // Lunch peak
      else if (hour >= 17 && hour <= 19) baseOccupancy = 18;  // Evening rush
      else if (hour >= 15 && hour <= 16) baseOccupancy = 14;  // Afternoon
      else baseOccupancy = 6 + Math.floor(Math.random() * 5); // Off-peak

      // Add noise + weekend variation
      const isWeekend = (timestamp.getDay() === 0 || timestamp.getDay() === 6);
      if (isWeekend) baseOccupancy = Math.floor(baseOccupancy * 0.6); // 60% on weekends

      const occupancy = Math.min(
        totalSlots,
        Math.max(0, baseOccupancy + Math.floor(Math.random() * 5) - 2)
      );

      await prisma.parkingAnalytics.create({
        data: {
          lotId: lot.id,
          timestamp,
          occupiedSlots: occupancy,
          totalSlots,
          avgDuration: 30 + Math.floor(Math.random() * 120), // 30-150 minutes
        },
      });
    }
  }
  console.log("✅ Created 14 days of hourly analytics data");

  // ── Done ────────────────────────────────────────────────────

  console.log("\n🎉 Seed complete!\n");
  console.log("── Credentials ──────────────────────────");
  console.log("Admin:    admin@smartpark.com / admin123");
  console.log("Security: security@smartpark.com / security123");
  console.log("User:     user@smartpark.com / user123");
  console.log("Jane:     jane@smartpark.com / jane123");
  console.log("──────────────────────────────────────────");
  console.log(`\nHardware API Key: ${process.env.HARDWARE_API_KEY || 'sp-hw-key-2026-demo'}`);
  console.log(`Demo RFID Tags:  RFID-DEMO-001, RFID-DEMO-002, RFID-JANE-001`);
  console.log(`Demo Lot ID:     demo-lot-1`);
  console.log(`\n── Sample Data ──────────────────────────`);
  console.log(`Active booking (REGISTERED):  ${activeBooking.id}`);
  console.log(`Completed booking (CONFIRMED): ${completedBooking.id}`);
  console.log(`Cancelled booking:             ${cancelledBooking.id}`);
  console.log(`Expired booking:               ${expiredBooking.id}`);
  console.log(`Parking sessions:              ${session1.id}, ${session2.id}, ${session3.id}`);
  console.log(`──────────────────────────────────────────\n`);
}

seed()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
