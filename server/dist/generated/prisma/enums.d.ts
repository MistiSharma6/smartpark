export declare const OTPType: {
    readonly EMAIL_VERIFICATION: "EMAIL_VERIFICATION";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
};
export type OTPType = (typeof OTPType)[keyof typeof OTPType];
export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly SECURITY: "SECURITY";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const SlotStatus: {
    readonly FREE: "FREE";
    readonly OCCUPIED: "OCCUPIED";
    readonly RESERVED: "RESERVED";
};
export type SlotStatus = (typeof SlotStatus)[keyof typeof SlotStatus];
export declare const SlotType: {
    readonly REGULAR: "REGULAR";
    readonly EV_CHARGING: "EV_CHARGING";
    readonly HANDICAPPED: "HANDICAPPED";
    readonly PREMIUM: "PREMIUM";
};
export type SlotType = (typeof SlotType)[keyof typeof SlotType];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly WAIVED: "WAIVED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly REGISTERED: "REGISTERED";
    readonly CONFIRMED: "CONFIRMED";
    readonly CHECKED_IN: "CHECKED_IN";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly EXPIRED: "EXPIRED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
//# sourceMappingURL=enums.d.ts.map