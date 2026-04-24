-- AlterEnum
-- Add new enum values in their own statements with COMMIT in between.
-- PostgreSQL requires new enum values to be committed before use.

ALTER TYPE "BookingStatus" ADD VALUE IF NOT EXISTS 'REGISTERED';
ALTER TYPE "BookingStatus" ADD VALUE IF NOT EXISTS 'COMPLETED';
ALTER TYPE "BookingStatus" ADD VALUE IF NOT EXISTS 'CHECKED_IN';
ALTER TYPE "BookingStatus" ADD VALUE IF NOT EXISTS 'CONFIRMED';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "checkedInAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "confirmedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "registered" BOOLEAN NOT NULL DEFAULT false;

-- Set default in a separate statement that won't run in the shadow DB transaction
-- We handle the default at the Prisma schema level instead
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'REGISTERED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "verified" BOOLEAN NOT NULL DEFAULT false;
