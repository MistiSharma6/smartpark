import { z } from "zod";
export declare const rfidScanSchema: z.ZodObject<{
    rfidTag: z.ZodString;
    lotId: z.ZodString;
    action: z.ZodEnum<{
        ENTRY: "ENTRY";
        EXIT: "EXIT";
    }>;
}, z.core.$strip>;
export declare const registerVehicleSchema: z.ZodObject<{
    rfidTag: z.ZodString;
    plateNo: z.ZodString;
}, z.core.$strip>;
export declare const updateVehicleSchema: z.ZodObject<{
    rfidTag: z.ZodOptional<z.ZodString>;
    plateNo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createLotSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    floors: z.ZodDefault<z.ZodNumber>;
    ratePerHour: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateLotSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    floors: z.ZodOptional<z.ZodNumber>;
    ratePerHour: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const graphSetupSchema: z.ZodObject<{
    entryNodeId: z.ZodString;
    nodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        x: z.ZodNumber;
        y: z.ZodNumber;
        floor: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    edges: z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
        weight: z.ZodNumber;
        directed: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    layoutData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodArray<z.ZodNumber>>>>;
    layoutMeta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
export declare const createSlotsSchema: z.ZodObject<{
    lotId: z.ZodString;
    slots: z.ZodArray<z.ZodObject<{
        block: z.ZodString;
        number: z.ZodNumber;
        floor: z.ZodNumber;
        type: z.ZodDefault<z.ZodEnum<{
            REGULAR: "REGULAR";
            EV_CHARGING: "EV_CHARGING";
            HANDICAPPED: "HANDICAPPED";
            PREMIUM: "PREMIUM";
        }>>;
        nodeId: z.ZodOptional<z.ZodString>;
        xCoord: z.ZodOptional<z.ZodNumber>;
        yCoord: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateSlotSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        REGULAR: "REGULAR";
        EV_CHARGING: "EV_CHARGING";
        HANDICAPPED: "HANDICAPPED";
        PREMIUM: "PREMIUM";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        FREE: "FREE";
        OCCUPIED: "OCCUPIED";
        RESERVED: "RESERVED";
    }>>;
    features: z.ZodOptional<z.ZodArray<z.ZodString>>;
    nodeId: z.ZodOptional<z.ZodString>;
    xCoord: z.ZodOptional<z.ZodNumber>;
    yCoord: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const manualEntrySchema: z.ZodObject<{
    vehicleId: z.ZodOptional<z.ZodString>;
    rfidTag: z.ZodOptional<z.ZodString>;
    plateNo: z.ZodOptional<z.ZodString>;
    lotId: z.ZodString;
}, z.core.$strip>;
export declare const manualExitSchema: z.ZodObject<{
    sessionId: z.ZodOptional<z.ZodString>;
    rfidTag: z.ZodOptional<z.ZodString>;
    plateNo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=parking.schema.d.ts.map