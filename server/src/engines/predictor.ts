/**
 * Predictive Analytics Engine
 *
 * Uses Simple Moving Average (SMA) on historical occupancy data
 * to predict:
 *   - Peak hours of the day
 *   - Expected occupancy at a future time
 *   - Average session duration trends
 */

import { prisma } from "../lib/prisma.js";

// ── Types ────────────────────────────────────────────────────

export interface HourlyOccupancy {
  hour: number;       // 0–23
  avgOccupancy: number;
  avgPercentage: number;
}

export interface PeakHourResult {
  peakHours: HourlyOccupancy[];
  quietHours: HourlyOccupancy[];
  busiestHour: number;
  quietestHour: number;
}

export interface PredictionResult {
  predictedOccupancy: number;
  predictedPercentage: number;
  confidence: number;  // 0–1 based on data availability
  basedOnDays: number;
}

export interface RevenueStats {
  totalRevenue: number;
  avgRevenuePerSession: number;
  totalSessions: number;
  avgDurationMinutes: number;
}

// ── Simple Moving Average ────────────────────────────────────

function sma(values: number[], window: number): number {
  if (values.length === 0) return 0;
  const slice = values.slice(-window);
  return slice.reduce((sum, v) => sum + v, 0) / slice.length;
}

// ── Peak Hours Analysis ──────────────────────────────────────

export async function analyzePeakHours(
  lotId: string,
  daysBack: number = 30
): Promise<PeakHourResult> {
  const since = new Date();
  since.setDate(since.getDate() - daysBack);

  const analytics = await prisma.parkingAnalytics.findMany({
    where: {
      lotId,
      timestamp: { gte: since },
    },
    orderBy: { timestamp: "asc" },
  });

  // Group by hour of day
  const hourlyBuckets: Map<number, { occupancy: number[]; total: number[] }> = new Map();
  for (let h = 0; h < 24; h++) {
    hourlyBuckets.set(h, { occupancy: [], total: [] });
  }

  for (const entry of analytics) {
    const hour = entry.timestamp.getHours();
    const bucket = hourlyBuckets.get(hour)!;
    bucket.occupancy.push(entry.occupiedSlots);
    bucket.total.push(entry.totalSlots);
  }

  const hourlyStats: HourlyOccupancy[] = [];
  for (let h = 0; h < 24; h++) {
    const bucket = hourlyBuckets.get(h)!;
    const avgOcc = sma(bucket.occupancy, bucket.occupancy.length);
    const avgTotal = sma(bucket.total, bucket.total.length);
    hourlyStats.push({
      hour: h,
      avgOccupancy: Math.round(avgOcc),
      avgPercentage: avgTotal > 0 ? Math.round((avgOcc / avgTotal) * 100) : 0,
    });
  }

  // Sort to find peak and quiet hours
  const sorted = [...hourlyStats].sort((a, b) => b.avgPercentage - a.avgPercentage);
  const peakHours = sorted.slice(0, 5);
  const quietHours = sorted.slice(-5).reverse();

  return {
    peakHours,
    quietHours,
    busiestHour: sorted[0]?.hour ?? 12,
    quietestHour: sorted[sorted.length - 1]?.hour ?? 3,
  };
}

// ── Predict Occupancy at Time ────────────────────────────────

export async function predictOccupancy(
  lotId: string,
  targetHour: number,
  daysBack: number = 14
): Promise<PredictionResult> {
  const since = new Date();
  since.setDate(since.getDate() - daysBack);

  const lot = await prisma.parkingLot.findUnique({ where: { id: lotId } });
  const totalSlots = lot?.totalSlots ?? 100;

  const analytics = await prisma.parkingAnalytics.findMany({
    where: {
      lotId,
      timestamp: { gte: since },
    },
    orderBy: { timestamp: "asc" },
  });

  // Filter entries for the target hour
  const hourEntries = analytics.filter(
    (e) => e.timestamp.getHours() === targetHour
  );

  if (hourEntries.length === 0) {
    return {
      predictedOccupancy: 0,
      predictedPercentage: 0,
      confidence: 0,
      basedOnDays: 0,
    };
  }

  const occupancies = hourEntries.map((e) => e.occupiedSlots);
  const window = Math.min(7, occupancies.length); // 7-day SMA
  const predicted = sma(occupancies, window);
  const confidence = Math.min(1, hourEntries.length / 14); // full confidence at 14+ data points

  return {
    predictedOccupancy: Math.round(predicted),
    predictedPercentage: Math.round((predicted / totalSlots) * 100),
    confidence: Math.round(confidence * 100) / 100,
    basedOnDays: hourEntries.length,
  };
}

// ── Revenue Statistics ───────────────────────────────────────

export async function getRevenueStatistics(
  lotId: string,
  daysBack: number = 30
): Promise<RevenueStats> {
  const since = new Date();
  since.setDate(since.getDate() - daysBack);

  // Get all completed sessions for slots in this lot
  const sessions = await prisma.parkingSession.findMany({
    where: {
      slot: { lotId },
      exitTime: { not: null },
      createdAt: { gte: since },
    },
  });

  const totalRevenue = sessions.reduce((sum, s) => sum + (s.cost ?? 0), 0);
  const totalDuration = sessions.reduce((sum, s) => sum + (s.duration ?? 0), 0);
  const totalSessions = sessions.length;

  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    avgRevenuePerSession: totalSessions > 0
      ? Math.round((totalRevenue / totalSessions) * 100) / 100
      : 0,
    totalSessions,
    avgDurationMinutes: totalSessions > 0
      ? Math.round(totalDuration / totalSessions)
      : 0,
  };
}

// ── Record Analytics Snapshot ────────────────────────────────

export async function recordAnalyticsSnapshot(lotId: string): Promise<void> {
  const lot = await prisma.parkingLot.findUnique({
    where: { id: lotId },
    include: {
      slots: {
        select: { status: true },
      },
    },
  });

  if (!lot) return;

  const occupiedSlots = lot.slots.filter((s) => s.status === "OCCUPIED").length;
  const totalSlots = lot.slots.length;

  // Get avg duration of sessions that ended in the last hour
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  const recentSessions = await prisma.parkingSession.findMany({
    where: {
      slot: { lotId },
      exitTime: { gte: oneHourAgo },
    },
  });

  const avgDuration =
    recentSessions.length > 0
      ? recentSessions.reduce((sum, s) => sum + (s.duration ?? 0), 0) /
        recentSessions.length
      : null;

  await prisma.parkingAnalytics.create({
    data: {
      lotId,
      occupiedSlots,
      totalSlots,
      avgDuration,
    },
  });
}
