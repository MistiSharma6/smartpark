import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly OTPVerification: "OTPVerification";
    readonly Vehicle: "Vehicle";
    readonly ParkingLot: "ParkingLot";
    readonly ParkingSlot: "ParkingSlot";
    readonly ParkingSession: "ParkingSession";
    readonly Booking: "Booking";
    readonly ParkingAnalytics: "ParkingAnalytics";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly role: "role";
    readonly verified: "verified";
    readonly passwordHash: "passwordHash";
    readonly refreshToken: "refreshToken";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const OTPVerificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly otp: "otp";
    readonly attempts: "attempts";
    readonly createdAt: "createdAt";
    readonly expiresAt: "expiresAt";
    readonly verified: "verified";
};
export type OTPVerificationScalarFieldEnum = (typeof OTPVerificationScalarFieldEnum)[keyof typeof OTPVerificationScalarFieldEnum];
export declare const VehicleScalarFieldEnum: {
    readonly id: "id";
    readonly rfidTag: "rfidTag";
    readonly plateNo: "plateNo";
    readonly ownerId: "ownerId";
};
export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum];
export declare const ParkingLotScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly address: "address";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly floors: "floors";
    readonly totalSlots: "totalSlots";
    readonly ratePerHour: "ratePerHour";
    readonly graphData: "graphData";
    readonly entryNodeId: "entryNodeId";
    readonly createdAt: "createdAt";
};
export type ParkingLotScalarFieldEnum = (typeof ParkingLotScalarFieldEnum)[keyof typeof ParkingLotScalarFieldEnum];
export declare const ParkingSlotScalarFieldEnum: {
    readonly id: "id";
    readonly block: "block";
    readonly number: "number";
    readonly floor: "floor";
    readonly type: "type";
    readonly status: "status";
    readonly xCoord: "xCoord";
    readonly yCoord: "yCoord";
    readonly nodeId: "nodeId";
    readonly features: "features";
    readonly lotId: "lotId";
};
export type ParkingSlotScalarFieldEnum = (typeof ParkingSlotScalarFieldEnum)[keyof typeof ParkingSlotScalarFieldEnum];
export declare const ParkingSessionScalarFieldEnum: {
    readonly id: "id";
    readonly vehicleId: "vehicleId";
    readonly slotId: "slotId";
    readonly entryTime: "entryTime";
    readonly exitTime: "exitTime";
    readonly duration: "duration";
    readonly cost: "cost";
    readonly paymentStatus: "paymentStatus";
    readonly bookingId: "bookingId";
    readonly createdAt: "createdAt";
};
export type ParkingSessionScalarFieldEnum = (typeof ParkingSessionScalarFieldEnum)[keyof typeof ParkingSessionScalarFieldEnum];
export declare const BookingScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly lotId: "lotId";
    readonly slotId: "slotId";
    readonly vehicleId: "vehicleId";
    readonly slotType: "slotType";
    readonly preferences: "preferences";
    readonly registered: "registered";
    readonly confirmed: "confirmed";
    readonly confirmedAt: "confirmedAt";
    readonly status: "status";
    readonly bookingTime: "bookingTime";
    readonly scheduledFor: "scheduledFor";
    readonly expiresAt: "expiresAt";
    readonly checkedInAt: "checkedInAt";
    readonly createdAt: "createdAt";
};
export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum];
export declare const ParkingAnalyticsScalarFieldEnum: {
    readonly id: "id";
    readonly lotId: "lotId";
    readonly timestamp: "timestamp";
    readonly occupiedSlots: "occupiedSlots";
    readonly totalSlots: "totalSlots";
    readonly avgDuration: "avgDuration";
};
export type ParkingAnalyticsScalarFieldEnum = (typeof ParkingAnalyticsScalarFieldEnum)[keyof typeof ParkingAnalyticsScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map