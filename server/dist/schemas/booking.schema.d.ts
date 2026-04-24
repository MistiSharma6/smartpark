import { z } from "zod";
export declare const createBookingSchema: z.ZodObject<{
    lotId: z.ZodString;
    vehicleId: z.ZodOptional<z.ZodString>;
    slotType: z.ZodDefault<z.ZodEnum<{
        REGULAR: "REGULAR";
        EV_CHARGING: "EV_CHARGING";
        HANDICAPPED: "HANDICAPPED";
        PREMIUM: "PREMIUM";
    }>>;
    preferences: z.ZodDefault<z.ZodArray<z.ZodString>>;
    scheduledFor: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const cancelBookingSchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=booking.schema.d.ts.map