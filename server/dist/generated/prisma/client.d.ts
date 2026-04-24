import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model OTPVerification
 *
 */
export type OTPVerification = Prisma.OTPVerificationModel;
/**
 * Model Vehicle
 *
 */
export type Vehicle = Prisma.VehicleModel;
/**
 * Model ParkingLot
 *
 */
export type ParkingLot = Prisma.ParkingLotModel;
/**
 * Model ParkingSlot
 *
 */
export type ParkingSlot = Prisma.ParkingSlotModel;
/**
 * Model ParkingSession
 *
 */
export type ParkingSession = Prisma.ParkingSessionModel;
/**
 * Model Booking
 *
 */
export type Booking = Prisma.BookingModel;
/**
 * Model ParkingAnalytics
 *
 */
export type ParkingAnalytics = Prisma.ParkingAnalyticsModel;
//# sourceMappingURL=client.d.ts.map