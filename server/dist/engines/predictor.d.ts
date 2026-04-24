/**
 * Predictive Analytics Engine
 *
 * Uses Simple Moving Average (SMA) on historical occupancy data
 * to predict:
 *   - Peak hours of the day
 *   - Expected occupancy at a future time
 *   - Average session duration trends
 */
export interface HourlyOccupancy {
    hour: number;
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
    confidence: number;
    basedOnDays: number;
}
export interface RevenueStats {
    totalRevenue: number;
    avgRevenuePerSession: number;
    totalSessions: number;
    avgDurationMinutes: number;
}
export declare function analyzePeakHours(lotId: string, daysBack?: number): Promise<PeakHourResult>;
export declare function predictOccupancy(lotId: string, targetHour: number, daysBack?: number): Promise<PredictionResult>;
export declare function getRevenueStatistics(lotId: string, daysBack?: number): Promise<RevenueStats>;
export declare function recordAnalyticsSnapshot(lotId: string): Promise<void>;
//# sourceMappingURL=predictor.d.ts.map