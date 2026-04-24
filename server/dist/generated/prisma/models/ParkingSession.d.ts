import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ParkingSession
 *
 */
export type ParkingSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$ParkingSessionPayload>;
export type AggregateParkingSession = {
    _count: ParkingSessionCountAggregateOutputType | null;
    _avg: ParkingSessionAvgAggregateOutputType | null;
    _sum: ParkingSessionSumAggregateOutputType | null;
    _min: ParkingSessionMinAggregateOutputType | null;
    _max: ParkingSessionMaxAggregateOutputType | null;
};
export type ParkingSessionAvgAggregateOutputType = {
    duration: number | null;
    cost: number | null;
};
export type ParkingSessionSumAggregateOutputType = {
    duration: number | null;
    cost: number | null;
};
export type ParkingSessionMinAggregateOutputType = {
    id: string | null;
    vehicleId: string | null;
    slotId: string | null;
    entryTime: Date | null;
    exitTime: Date | null;
    duration: number | null;
    cost: number | null;
    paymentStatus: $Enums.PaymentStatus | null;
    bookingId: string | null;
    createdAt: Date | null;
};
export type ParkingSessionMaxAggregateOutputType = {
    id: string | null;
    vehicleId: string | null;
    slotId: string | null;
    entryTime: Date | null;
    exitTime: Date | null;
    duration: number | null;
    cost: number | null;
    paymentStatus: $Enums.PaymentStatus | null;
    bookingId: string | null;
    createdAt: Date | null;
};
export type ParkingSessionCountAggregateOutputType = {
    id: number;
    vehicleId: number;
    slotId: number;
    entryTime: number;
    exitTime: number;
    duration: number;
    cost: number;
    paymentStatus: number;
    bookingId: number;
    createdAt: number;
    _all: number;
};
export type ParkingSessionAvgAggregateInputType = {
    duration?: true;
    cost?: true;
};
export type ParkingSessionSumAggregateInputType = {
    duration?: true;
    cost?: true;
};
export type ParkingSessionMinAggregateInputType = {
    id?: true;
    vehicleId?: true;
    slotId?: true;
    entryTime?: true;
    exitTime?: true;
    duration?: true;
    cost?: true;
    paymentStatus?: true;
    bookingId?: true;
    createdAt?: true;
};
export type ParkingSessionMaxAggregateInputType = {
    id?: true;
    vehicleId?: true;
    slotId?: true;
    entryTime?: true;
    exitTime?: true;
    duration?: true;
    cost?: true;
    paymentStatus?: true;
    bookingId?: true;
    createdAt?: true;
};
export type ParkingSessionCountAggregateInputType = {
    id?: true;
    vehicleId?: true;
    slotId?: true;
    entryTime?: true;
    exitTime?: true;
    duration?: true;
    cost?: true;
    paymentStatus?: true;
    bookingId?: true;
    createdAt?: true;
    _all?: true;
};
export type ParkingSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingSession to aggregate.
     */
    where?: Prisma.ParkingSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingSessions to fetch.
     */
    orderBy?: Prisma.ParkingSessionOrderByWithRelationInput | Prisma.ParkingSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ParkingSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ParkingSessions
    **/
    _count?: true | ParkingSessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ParkingSessionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ParkingSessionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ParkingSessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ParkingSessionMaxAggregateInputType;
};
export type GetParkingSessionAggregateType<T extends ParkingSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateParkingSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateParkingSession[P]> : Prisma.GetScalarType<T[P], AggregateParkingSession[P]>;
};
export type ParkingSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParkingSessionWhereInput;
    orderBy?: Prisma.ParkingSessionOrderByWithAggregationInput | Prisma.ParkingSessionOrderByWithAggregationInput[];
    by: Prisma.ParkingSessionScalarFieldEnum[] | Prisma.ParkingSessionScalarFieldEnum;
    having?: Prisma.ParkingSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ParkingSessionCountAggregateInputType | true;
    _avg?: ParkingSessionAvgAggregateInputType;
    _sum?: ParkingSessionSumAggregateInputType;
    _min?: ParkingSessionMinAggregateInputType;
    _max?: ParkingSessionMaxAggregateInputType;
};
export type ParkingSessionGroupByOutputType = {
    id: string;
    vehicleId: string;
    slotId: string;
    entryTime: Date;
    exitTime: Date | null;
    duration: number | null;
    cost: number | null;
    paymentStatus: $Enums.PaymentStatus;
    bookingId: string | null;
    createdAt: Date;
    _count: ParkingSessionCountAggregateOutputType | null;
    _avg: ParkingSessionAvgAggregateOutputType | null;
    _sum: ParkingSessionSumAggregateOutputType | null;
    _min: ParkingSessionMinAggregateOutputType | null;
    _max: ParkingSessionMaxAggregateOutputType | null;
};
export type GetParkingSessionGroupByPayload<T extends ParkingSessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ParkingSessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ParkingSessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ParkingSessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ParkingSessionGroupByOutputType[P]>;
}>>;
export type ParkingSessionWhereInput = {
    AND?: Prisma.ParkingSessionWhereInput | Prisma.ParkingSessionWhereInput[];
    OR?: Prisma.ParkingSessionWhereInput[];
    NOT?: Prisma.ParkingSessionWhereInput | Prisma.ParkingSessionWhereInput[];
    id?: Prisma.StringFilter<"ParkingSession"> | string;
    vehicleId?: Prisma.StringFilter<"ParkingSession"> | string;
    slotId?: Prisma.StringFilter<"ParkingSession"> | string;
    entryTime?: Prisma.DateTimeFilter<"ParkingSession"> | Date | string;
    exitTime?: Prisma.DateTimeNullableFilter<"ParkingSession"> | Date | string | null;
    duration?: Prisma.IntNullableFilter<"ParkingSession"> | number | null;
    cost?: Prisma.FloatNullableFilter<"ParkingSession"> | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFilter<"ParkingSession"> | $Enums.PaymentStatus;
    bookingId?: Prisma.StringNullableFilter<"ParkingSession"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ParkingSession"> | Date | string;
    vehicle?: Prisma.XOR<Prisma.VehicleScalarRelationFilter, Prisma.VehicleWhereInput>;
    slot?: Prisma.XOR<Prisma.ParkingSlotScalarRelationFilter, Prisma.ParkingSlotWhereInput>;
    booking?: Prisma.XOR<Prisma.BookingNullableScalarRelationFilter, Prisma.BookingWhereInput> | null;
};
export type ParkingSessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    entryTime?: Prisma.SortOrder;
    exitTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    duration?: Prisma.SortOrderInput | Prisma.SortOrder;
    cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    vehicle?: Prisma.VehicleOrderByWithRelationInput;
    slot?: Prisma.ParkingSlotOrderByWithRelationInput;
    booking?: Prisma.BookingOrderByWithRelationInput;
};
export type ParkingSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ParkingSessionWhereInput | Prisma.ParkingSessionWhereInput[];
    OR?: Prisma.ParkingSessionWhereInput[];
    NOT?: Prisma.ParkingSessionWhereInput | Prisma.ParkingSessionWhereInput[];
    vehicleId?: Prisma.StringFilter<"ParkingSession"> | string;
    slotId?: Prisma.StringFilter<"ParkingSession"> | string;
    entryTime?: Prisma.DateTimeFilter<"ParkingSession"> | Date | string;
    exitTime?: Prisma.DateTimeNullableFilter<"ParkingSession"> | Date | string | null;
    duration?: Prisma.IntNullableFilter<"ParkingSession"> | number | null;
    cost?: Prisma.FloatNullableFilter<"ParkingSession"> | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFilter<"ParkingSession"> | $Enums.PaymentStatus;
    bookingId?: Prisma.StringNullableFilter<"ParkingSession"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ParkingSession"> | Date | string;
    vehicle?: Prisma.XOR<Prisma.VehicleScalarRelationFilter, Prisma.VehicleWhereInput>;
    slot?: Prisma.XOR<Prisma.ParkingSlotScalarRelationFilter, Prisma.ParkingSlotWhereInput>;
    booking?: Prisma.XOR<Prisma.BookingNullableScalarRelationFilter, Prisma.BookingWhereInput> | null;
}, "id">;
export type ParkingSessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    entryTime?: Prisma.SortOrder;
    exitTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    duration?: Prisma.SortOrderInput | Prisma.SortOrder;
    cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ParkingSessionCountOrderByAggregateInput;
    _avg?: Prisma.ParkingSessionAvgOrderByAggregateInput;
    _max?: Prisma.ParkingSessionMaxOrderByAggregateInput;
    _min?: Prisma.ParkingSessionMinOrderByAggregateInput;
    _sum?: Prisma.ParkingSessionSumOrderByAggregateInput;
};
export type ParkingSessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ParkingSessionScalarWhereWithAggregatesInput | Prisma.ParkingSessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ParkingSessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ParkingSessionScalarWhereWithAggregatesInput | Prisma.ParkingSessionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ParkingSession"> | string;
    vehicleId?: Prisma.StringWithAggregatesFilter<"ParkingSession"> | string;
    slotId?: Prisma.StringWithAggregatesFilter<"ParkingSession"> | string;
    entryTime?: Prisma.DateTimeWithAggregatesFilter<"ParkingSession"> | Date | string;
    exitTime?: Prisma.DateTimeNullableWithAggregatesFilter<"ParkingSession"> | Date | string | null;
    duration?: Prisma.IntNullableWithAggregatesFilter<"ParkingSession"> | number | null;
    cost?: Prisma.FloatNullableWithAggregatesFilter<"ParkingSession"> | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusWithAggregatesFilter<"ParkingSession"> | $Enums.PaymentStatus;
    bookingId?: Prisma.StringNullableWithAggregatesFilter<"ParkingSession"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ParkingSession"> | Date | string;
};
export type ParkingSessionCreateInput = {
    id?: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    createdAt?: Date | string;
    vehicle: Prisma.VehicleCreateNestedOneWithoutSessionsInput;
    slot: Prisma.ParkingSlotCreateNestedOneWithoutSessionsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutSessionsInput;
};
export type ParkingSessionUncheckedCreateInput = {
    id?: string;
    vehicleId: string;
    slotId: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    bookingId?: string | null;
    createdAt?: Date | string;
};
export type ParkingSessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vehicle?: Prisma.VehicleUpdateOneRequiredWithoutSessionsNestedInput;
    slot?: Prisma.ParkingSlotUpdateOneRequiredWithoutSessionsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutSessionsNestedInput;
};
export type ParkingSessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingSessionCreateManyInput = {
    id?: string;
    vehicleId: string;
    slotId: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    bookingId?: string | null;
    createdAt?: Date | string;
};
export type ParkingSessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingSessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingSessionListRelationFilter = {
    every?: Prisma.ParkingSessionWhereInput;
    some?: Prisma.ParkingSessionWhereInput;
    none?: Prisma.ParkingSessionWhereInput;
};
export type ParkingSessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ParkingSessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    entryTime?: Prisma.SortOrder;
    exitTime?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ParkingSessionAvgOrderByAggregateInput = {
    duration?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type ParkingSessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    entryTime?: Prisma.SortOrder;
    exitTime?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ParkingSessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    entryTime?: Prisma.SortOrder;
    exitTime?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ParkingSessionSumOrderByAggregateInput = {
    duration?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type ParkingSessionCreateNestedManyWithoutVehicleInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutVehicleInput, Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput> | Prisma.ParkingSessionCreateWithoutVehicleInput[] | Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutVehicleInput | Prisma.ParkingSessionCreateOrConnectWithoutVehicleInput[];
    createMany?: Prisma.ParkingSessionCreateManyVehicleInputEnvelope;
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
};
export type ParkingSessionUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutVehicleInput, Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput> | Prisma.ParkingSessionCreateWithoutVehicleInput[] | Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutVehicleInput | Prisma.ParkingSessionCreateOrConnectWithoutVehicleInput[];
    createMany?: Prisma.ParkingSessionCreateManyVehicleInputEnvelope;
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
};
export type ParkingSessionUpdateManyWithoutVehicleNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutVehicleInput, Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput> | Prisma.ParkingSessionCreateWithoutVehicleInput[] | Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutVehicleInput | Prisma.ParkingSessionCreateOrConnectWithoutVehicleInput[];
    upsert?: Prisma.ParkingSessionUpsertWithWhereUniqueWithoutVehicleInput | Prisma.ParkingSessionUpsertWithWhereUniqueWithoutVehicleInput[];
    createMany?: Prisma.ParkingSessionCreateManyVehicleInputEnvelope;
    set?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    disconnect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    delete?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    update?: Prisma.ParkingSessionUpdateWithWhereUniqueWithoutVehicleInput | Prisma.ParkingSessionUpdateWithWhereUniqueWithoutVehicleInput[];
    updateMany?: Prisma.ParkingSessionUpdateManyWithWhereWithoutVehicleInput | Prisma.ParkingSessionUpdateManyWithWhereWithoutVehicleInput[];
    deleteMany?: Prisma.ParkingSessionScalarWhereInput | Prisma.ParkingSessionScalarWhereInput[];
};
export type ParkingSessionUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutVehicleInput, Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput> | Prisma.ParkingSessionCreateWithoutVehicleInput[] | Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutVehicleInput | Prisma.ParkingSessionCreateOrConnectWithoutVehicleInput[];
    upsert?: Prisma.ParkingSessionUpsertWithWhereUniqueWithoutVehicleInput | Prisma.ParkingSessionUpsertWithWhereUniqueWithoutVehicleInput[];
    createMany?: Prisma.ParkingSessionCreateManyVehicleInputEnvelope;
    set?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    disconnect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    delete?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    update?: Prisma.ParkingSessionUpdateWithWhereUniqueWithoutVehicleInput | Prisma.ParkingSessionUpdateWithWhereUniqueWithoutVehicleInput[];
    updateMany?: Prisma.ParkingSessionUpdateManyWithWhereWithoutVehicleInput | Prisma.ParkingSessionUpdateManyWithWhereWithoutVehicleInput[];
    deleteMany?: Prisma.ParkingSessionScalarWhereInput | Prisma.ParkingSessionScalarWhereInput[];
};
export type ParkingSessionCreateNestedManyWithoutSlotInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutSlotInput, Prisma.ParkingSessionUncheckedCreateWithoutSlotInput> | Prisma.ParkingSessionCreateWithoutSlotInput[] | Prisma.ParkingSessionUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutSlotInput | Prisma.ParkingSessionCreateOrConnectWithoutSlotInput[];
    createMany?: Prisma.ParkingSessionCreateManySlotInputEnvelope;
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
};
export type ParkingSessionUncheckedCreateNestedManyWithoutSlotInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutSlotInput, Prisma.ParkingSessionUncheckedCreateWithoutSlotInput> | Prisma.ParkingSessionCreateWithoutSlotInput[] | Prisma.ParkingSessionUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutSlotInput | Prisma.ParkingSessionCreateOrConnectWithoutSlotInput[];
    createMany?: Prisma.ParkingSessionCreateManySlotInputEnvelope;
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
};
export type ParkingSessionUpdateManyWithoutSlotNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutSlotInput, Prisma.ParkingSessionUncheckedCreateWithoutSlotInput> | Prisma.ParkingSessionCreateWithoutSlotInput[] | Prisma.ParkingSessionUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutSlotInput | Prisma.ParkingSessionCreateOrConnectWithoutSlotInput[];
    upsert?: Prisma.ParkingSessionUpsertWithWhereUniqueWithoutSlotInput | Prisma.ParkingSessionUpsertWithWhereUniqueWithoutSlotInput[];
    createMany?: Prisma.ParkingSessionCreateManySlotInputEnvelope;
    set?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    disconnect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    delete?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    update?: Prisma.ParkingSessionUpdateWithWhereUniqueWithoutSlotInput | Prisma.ParkingSessionUpdateWithWhereUniqueWithoutSlotInput[];
    updateMany?: Prisma.ParkingSessionUpdateManyWithWhereWithoutSlotInput | Prisma.ParkingSessionUpdateManyWithWhereWithoutSlotInput[];
    deleteMany?: Prisma.ParkingSessionScalarWhereInput | Prisma.ParkingSessionScalarWhereInput[];
};
export type ParkingSessionUncheckedUpdateManyWithoutSlotNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutSlotInput, Prisma.ParkingSessionUncheckedCreateWithoutSlotInput> | Prisma.ParkingSessionCreateWithoutSlotInput[] | Prisma.ParkingSessionUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutSlotInput | Prisma.ParkingSessionCreateOrConnectWithoutSlotInput[];
    upsert?: Prisma.ParkingSessionUpsertWithWhereUniqueWithoutSlotInput | Prisma.ParkingSessionUpsertWithWhereUniqueWithoutSlotInput[];
    createMany?: Prisma.ParkingSessionCreateManySlotInputEnvelope;
    set?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    disconnect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    delete?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    update?: Prisma.ParkingSessionUpdateWithWhereUniqueWithoutSlotInput | Prisma.ParkingSessionUpdateWithWhereUniqueWithoutSlotInput[];
    updateMany?: Prisma.ParkingSessionUpdateManyWithWhereWithoutSlotInput | Prisma.ParkingSessionUpdateManyWithWhereWithoutSlotInput[];
    deleteMany?: Prisma.ParkingSessionScalarWhereInput | Prisma.ParkingSessionScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus;
};
export type ParkingSessionCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutBookingInput, Prisma.ParkingSessionUncheckedCreateWithoutBookingInput> | Prisma.ParkingSessionCreateWithoutBookingInput[] | Prisma.ParkingSessionUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutBookingInput | Prisma.ParkingSessionCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ParkingSessionCreateManyBookingInputEnvelope;
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
};
export type ParkingSessionUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutBookingInput, Prisma.ParkingSessionUncheckedCreateWithoutBookingInput> | Prisma.ParkingSessionCreateWithoutBookingInput[] | Prisma.ParkingSessionUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutBookingInput | Prisma.ParkingSessionCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ParkingSessionCreateManyBookingInputEnvelope;
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
};
export type ParkingSessionUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutBookingInput, Prisma.ParkingSessionUncheckedCreateWithoutBookingInput> | Prisma.ParkingSessionCreateWithoutBookingInput[] | Prisma.ParkingSessionUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutBookingInput | Prisma.ParkingSessionCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ParkingSessionUpsertWithWhereUniqueWithoutBookingInput | Prisma.ParkingSessionUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ParkingSessionCreateManyBookingInputEnvelope;
    set?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    disconnect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    delete?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    update?: Prisma.ParkingSessionUpdateWithWhereUniqueWithoutBookingInput | Prisma.ParkingSessionUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ParkingSessionUpdateManyWithWhereWithoutBookingInput | Prisma.ParkingSessionUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ParkingSessionScalarWhereInput | Prisma.ParkingSessionScalarWhereInput[];
};
export type ParkingSessionUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSessionCreateWithoutBookingInput, Prisma.ParkingSessionUncheckedCreateWithoutBookingInput> | Prisma.ParkingSessionCreateWithoutBookingInput[] | Prisma.ParkingSessionUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ParkingSessionCreateOrConnectWithoutBookingInput | Prisma.ParkingSessionCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ParkingSessionUpsertWithWhereUniqueWithoutBookingInput | Prisma.ParkingSessionUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ParkingSessionCreateManyBookingInputEnvelope;
    set?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    disconnect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    delete?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    connect?: Prisma.ParkingSessionWhereUniqueInput | Prisma.ParkingSessionWhereUniqueInput[];
    update?: Prisma.ParkingSessionUpdateWithWhereUniqueWithoutBookingInput | Prisma.ParkingSessionUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ParkingSessionUpdateManyWithWhereWithoutBookingInput | Prisma.ParkingSessionUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ParkingSessionScalarWhereInput | Prisma.ParkingSessionScalarWhereInput[];
};
export type ParkingSessionCreateWithoutVehicleInput = {
    id?: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    createdAt?: Date | string;
    slot: Prisma.ParkingSlotCreateNestedOneWithoutSessionsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutSessionsInput;
};
export type ParkingSessionUncheckedCreateWithoutVehicleInput = {
    id?: string;
    slotId: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    bookingId?: string | null;
    createdAt?: Date | string;
};
export type ParkingSessionCreateOrConnectWithoutVehicleInput = {
    where: Prisma.ParkingSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingSessionCreateWithoutVehicleInput, Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput>;
};
export type ParkingSessionCreateManyVehicleInputEnvelope = {
    data: Prisma.ParkingSessionCreateManyVehicleInput | Prisma.ParkingSessionCreateManyVehicleInput[];
    skipDuplicates?: boolean;
};
export type ParkingSessionUpsertWithWhereUniqueWithoutVehicleInput = {
    where: Prisma.ParkingSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParkingSessionUpdateWithoutVehicleInput, Prisma.ParkingSessionUncheckedUpdateWithoutVehicleInput>;
    create: Prisma.XOR<Prisma.ParkingSessionCreateWithoutVehicleInput, Prisma.ParkingSessionUncheckedCreateWithoutVehicleInput>;
};
export type ParkingSessionUpdateWithWhereUniqueWithoutVehicleInput = {
    where: Prisma.ParkingSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParkingSessionUpdateWithoutVehicleInput, Prisma.ParkingSessionUncheckedUpdateWithoutVehicleInput>;
};
export type ParkingSessionUpdateManyWithWhereWithoutVehicleInput = {
    where: Prisma.ParkingSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.ParkingSessionUpdateManyMutationInput, Prisma.ParkingSessionUncheckedUpdateManyWithoutVehicleInput>;
};
export type ParkingSessionScalarWhereInput = {
    AND?: Prisma.ParkingSessionScalarWhereInput | Prisma.ParkingSessionScalarWhereInput[];
    OR?: Prisma.ParkingSessionScalarWhereInput[];
    NOT?: Prisma.ParkingSessionScalarWhereInput | Prisma.ParkingSessionScalarWhereInput[];
    id?: Prisma.StringFilter<"ParkingSession"> | string;
    vehicleId?: Prisma.StringFilter<"ParkingSession"> | string;
    slotId?: Prisma.StringFilter<"ParkingSession"> | string;
    entryTime?: Prisma.DateTimeFilter<"ParkingSession"> | Date | string;
    exitTime?: Prisma.DateTimeNullableFilter<"ParkingSession"> | Date | string | null;
    duration?: Prisma.IntNullableFilter<"ParkingSession"> | number | null;
    cost?: Prisma.FloatNullableFilter<"ParkingSession"> | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFilter<"ParkingSession"> | $Enums.PaymentStatus;
    bookingId?: Prisma.StringNullableFilter<"ParkingSession"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ParkingSession"> | Date | string;
};
export type ParkingSessionCreateWithoutSlotInput = {
    id?: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    createdAt?: Date | string;
    vehicle: Prisma.VehicleCreateNestedOneWithoutSessionsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutSessionsInput;
};
export type ParkingSessionUncheckedCreateWithoutSlotInput = {
    id?: string;
    vehicleId: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    bookingId?: string | null;
    createdAt?: Date | string;
};
export type ParkingSessionCreateOrConnectWithoutSlotInput = {
    where: Prisma.ParkingSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingSessionCreateWithoutSlotInput, Prisma.ParkingSessionUncheckedCreateWithoutSlotInput>;
};
export type ParkingSessionCreateManySlotInputEnvelope = {
    data: Prisma.ParkingSessionCreateManySlotInput | Prisma.ParkingSessionCreateManySlotInput[];
    skipDuplicates?: boolean;
};
export type ParkingSessionUpsertWithWhereUniqueWithoutSlotInput = {
    where: Prisma.ParkingSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParkingSessionUpdateWithoutSlotInput, Prisma.ParkingSessionUncheckedUpdateWithoutSlotInput>;
    create: Prisma.XOR<Prisma.ParkingSessionCreateWithoutSlotInput, Prisma.ParkingSessionUncheckedCreateWithoutSlotInput>;
};
export type ParkingSessionUpdateWithWhereUniqueWithoutSlotInput = {
    where: Prisma.ParkingSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParkingSessionUpdateWithoutSlotInput, Prisma.ParkingSessionUncheckedUpdateWithoutSlotInput>;
};
export type ParkingSessionUpdateManyWithWhereWithoutSlotInput = {
    where: Prisma.ParkingSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.ParkingSessionUpdateManyMutationInput, Prisma.ParkingSessionUncheckedUpdateManyWithoutSlotInput>;
};
export type ParkingSessionCreateWithoutBookingInput = {
    id?: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    createdAt?: Date | string;
    vehicle: Prisma.VehicleCreateNestedOneWithoutSessionsInput;
    slot: Prisma.ParkingSlotCreateNestedOneWithoutSessionsInput;
};
export type ParkingSessionUncheckedCreateWithoutBookingInput = {
    id?: string;
    vehicleId: string;
    slotId: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    createdAt?: Date | string;
};
export type ParkingSessionCreateOrConnectWithoutBookingInput = {
    where: Prisma.ParkingSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingSessionCreateWithoutBookingInput, Prisma.ParkingSessionUncheckedCreateWithoutBookingInput>;
};
export type ParkingSessionCreateManyBookingInputEnvelope = {
    data: Prisma.ParkingSessionCreateManyBookingInput | Prisma.ParkingSessionCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type ParkingSessionUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ParkingSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParkingSessionUpdateWithoutBookingInput, Prisma.ParkingSessionUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.ParkingSessionCreateWithoutBookingInput, Prisma.ParkingSessionUncheckedCreateWithoutBookingInput>;
};
export type ParkingSessionUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ParkingSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParkingSessionUpdateWithoutBookingInput, Prisma.ParkingSessionUncheckedUpdateWithoutBookingInput>;
};
export type ParkingSessionUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.ParkingSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.ParkingSessionUpdateManyMutationInput, Prisma.ParkingSessionUncheckedUpdateManyWithoutBookingInput>;
};
export type ParkingSessionCreateManyVehicleInput = {
    id?: string;
    slotId: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    bookingId?: string | null;
    createdAt?: Date | string;
};
export type ParkingSessionUpdateWithoutVehicleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    slot?: Prisma.ParkingSlotUpdateOneRequiredWithoutSessionsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutSessionsNestedInput;
};
export type ParkingSessionUncheckedUpdateWithoutVehicleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingSessionUncheckedUpdateManyWithoutVehicleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingSessionCreateManySlotInput = {
    id?: string;
    vehicleId: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    bookingId?: string | null;
    createdAt?: Date | string;
};
export type ParkingSessionUpdateWithoutSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vehicle?: Prisma.VehicleUpdateOneRequiredWithoutSessionsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutSessionsNestedInput;
};
export type ParkingSessionUncheckedUpdateWithoutSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingSessionUncheckedUpdateManyWithoutSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingSessionCreateManyBookingInput = {
    id?: string;
    vehicleId: string;
    slotId: string;
    entryTime?: Date | string;
    exitTime?: Date | string | null;
    duration?: number | null;
    cost?: number | null;
    paymentStatus?: $Enums.PaymentStatus;
    createdAt?: Date | string;
};
export type ParkingSessionUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vehicle?: Prisma.VehicleUpdateOneRequiredWithoutSessionsNestedInput;
    slot?: Prisma.ParkingSlotUpdateOneRequiredWithoutSessionsNestedInput;
};
export type ParkingSessionUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingSessionUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    entryTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vehicleId?: boolean;
    slotId?: boolean;
    entryTime?: boolean;
    exitTime?: boolean;
    duration?: boolean;
    cost?: boolean;
    paymentStatus?: boolean;
    bookingId?: boolean;
    createdAt?: boolean;
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.ParkingSlotDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.ParkingSession$bookingArgs<ExtArgs>;
}, ExtArgs["result"]["parkingSession"]>;
export type ParkingSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vehicleId?: boolean;
    slotId?: boolean;
    entryTime?: boolean;
    exitTime?: boolean;
    duration?: boolean;
    cost?: boolean;
    paymentStatus?: boolean;
    bookingId?: boolean;
    createdAt?: boolean;
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.ParkingSlotDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.ParkingSession$bookingArgs<ExtArgs>;
}, ExtArgs["result"]["parkingSession"]>;
export type ParkingSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vehicleId?: boolean;
    slotId?: boolean;
    entryTime?: boolean;
    exitTime?: boolean;
    duration?: boolean;
    cost?: boolean;
    paymentStatus?: boolean;
    bookingId?: boolean;
    createdAt?: boolean;
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.ParkingSlotDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.ParkingSession$bookingArgs<ExtArgs>;
}, ExtArgs["result"]["parkingSession"]>;
export type ParkingSessionSelectScalar = {
    id?: boolean;
    vehicleId?: boolean;
    slotId?: boolean;
    entryTime?: boolean;
    exitTime?: boolean;
    duration?: boolean;
    cost?: boolean;
    paymentStatus?: boolean;
    bookingId?: boolean;
    createdAt?: boolean;
};
export type ParkingSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "vehicleId" | "slotId" | "entryTime" | "exitTime" | "duration" | "cost" | "paymentStatus" | "bookingId" | "createdAt", ExtArgs["result"]["parkingSession"]>;
export type ParkingSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.ParkingSlotDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.ParkingSession$bookingArgs<ExtArgs>;
};
export type ParkingSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.ParkingSlotDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.ParkingSession$bookingArgs<ExtArgs>;
};
export type ParkingSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.ParkingSlotDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.ParkingSession$bookingArgs<ExtArgs>;
};
export type $ParkingSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ParkingSession";
    objects: {
        vehicle: Prisma.$VehiclePayload<ExtArgs>;
        slot: Prisma.$ParkingSlotPayload<ExtArgs>;
        booking: Prisma.$BookingPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        vehicleId: string;
        slotId: string;
        entryTime: Date;
        exitTime: Date | null;
        duration: number | null;
        cost: number | null;
        paymentStatus: $Enums.PaymentStatus;
        bookingId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["parkingSession"]>;
    composites: {};
};
export type ParkingSessionGetPayload<S extends boolean | null | undefined | ParkingSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload, S>;
export type ParkingSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ParkingSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ParkingSessionCountAggregateInputType | true;
};
export interface ParkingSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ParkingSession'];
        meta: {
            name: 'ParkingSession';
        };
    };
    /**
     * Find zero or one ParkingSession that matches the filter.
     * @param {ParkingSessionFindUniqueArgs} args - Arguments to find a ParkingSession
     * @example
     * // Get one ParkingSession
     * const parkingSession = await prisma.parkingSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParkingSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, ParkingSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ParkingSessionClient<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ParkingSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParkingSessionFindUniqueOrThrowArgs} args - Arguments to find a ParkingSession
     * @example
     * // Get one ParkingSession
     * const parkingSession = await prisma.parkingSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParkingSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ParkingSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParkingSessionClient<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParkingSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSessionFindFirstArgs} args - Arguments to find a ParkingSession
     * @example
     * // Get one ParkingSession
     * const parkingSession = await prisma.parkingSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParkingSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, ParkingSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ParkingSessionClient<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParkingSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSessionFindFirstOrThrowArgs} args - Arguments to find a ParkingSession
     * @example
     * // Get one ParkingSession
     * const parkingSession = await prisma.parkingSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParkingSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ParkingSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParkingSessionClient<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ParkingSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParkingSessions
     * const parkingSessions = await prisma.parkingSession.findMany()
     *
     * // Get first 10 ParkingSessions
     * const parkingSessions = await prisma.parkingSession.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const parkingSessionWithIdOnly = await prisma.parkingSession.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ParkingSessionFindManyArgs>(args?: Prisma.SelectSubset<T, ParkingSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ParkingSession.
     * @param {ParkingSessionCreateArgs} args - Arguments to create a ParkingSession.
     * @example
     * // Create one ParkingSession
     * const ParkingSession = await prisma.parkingSession.create({
     *   data: {
     *     // ... data to create a ParkingSession
     *   }
     * })
     *
     */
    create<T extends ParkingSessionCreateArgs>(args: Prisma.SelectSubset<T, ParkingSessionCreateArgs<ExtArgs>>): Prisma.Prisma__ParkingSessionClient<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ParkingSessions.
     * @param {ParkingSessionCreateManyArgs} args - Arguments to create many ParkingSessions.
     * @example
     * // Create many ParkingSessions
     * const parkingSession = await prisma.parkingSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ParkingSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, ParkingSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ParkingSessions and returns the data saved in the database.
     * @param {ParkingSessionCreateManyAndReturnArgs} args - Arguments to create many ParkingSessions.
     * @example
     * // Create many ParkingSessions
     * const parkingSession = await prisma.parkingSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ParkingSessions and only return the `id`
     * const parkingSessionWithIdOnly = await prisma.parkingSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ParkingSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ParkingSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ParkingSession.
     * @param {ParkingSessionDeleteArgs} args - Arguments to delete one ParkingSession.
     * @example
     * // Delete one ParkingSession
     * const ParkingSession = await prisma.parkingSession.delete({
     *   where: {
     *     // ... filter to delete one ParkingSession
     *   }
     * })
     *
     */
    delete<T extends ParkingSessionDeleteArgs>(args: Prisma.SelectSubset<T, ParkingSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__ParkingSessionClient<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ParkingSession.
     * @param {ParkingSessionUpdateArgs} args - Arguments to update one ParkingSession.
     * @example
     * // Update one ParkingSession
     * const parkingSession = await prisma.parkingSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ParkingSessionUpdateArgs>(args: Prisma.SelectSubset<T, ParkingSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__ParkingSessionClient<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ParkingSessions.
     * @param {ParkingSessionDeleteManyArgs} args - Arguments to filter ParkingSessions to delete.
     * @example
     * // Delete a few ParkingSessions
     * const { count } = await prisma.parkingSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ParkingSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ParkingSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParkingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParkingSessions
     * const parkingSession = await prisma.parkingSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ParkingSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, ParkingSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParkingSessions and returns the data updated in the database.
     * @param {ParkingSessionUpdateManyAndReturnArgs} args - Arguments to update many ParkingSessions.
     * @example
     * // Update many ParkingSessions
     * const parkingSession = await prisma.parkingSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ParkingSessions and only return the `id`
     * const parkingSessionWithIdOnly = await prisma.parkingSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ParkingSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ParkingSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ParkingSession.
     * @param {ParkingSessionUpsertArgs} args - Arguments to update or create a ParkingSession.
     * @example
     * // Update or create a ParkingSession
     * const parkingSession = await prisma.parkingSession.upsert({
     *   create: {
     *     // ... data to create a ParkingSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParkingSession we want to update
     *   }
     * })
     */
    upsert<T extends ParkingSessionUpsertArgs>(args: Prisma.SelectSubset<T, ParkingSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__ParkingSessionClient<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ParkingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSessionCountArgs} args - Arguments to filter ParkingSessions to count.
     * @example
     * // Count the number of ParkingSessions
     * const count = await prisma.parkingSession.count({
     *   where: {
     *     // ... the filter for the ParkingSessions we want to count
     *   }
     * })
    **/
    count<T extends ParkingSessionCountArgs>(args?: Prisma.Subset<T, ParkingSessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ParkingSessionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ParkingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParkingSessionAggregateArgs>(args: Prisma.Subset<T, ParkingSessionAggregateArgs>): Prisma.PrismaPromise<GetParkingSessionAggregateType<T>>;
    /**
     * Group by ParkingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends ParkingSessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ParkingSessionGroupByArgs['orderBy'];
    } : {
        orderBy?: ParkingSessionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ParkingSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParkingSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ParkingSession model
     */
    readonly fields: ParkingSessionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ParkingSession.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ParkingSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    vehicle<T extends Prisma.VehicleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicleDefaultArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    slot<T extends Prisma.ParkingSlotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParkingSlotDefaultArgs<ExtArgs>>): Prisma.Prisma__ParkingSlotClient<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    booking<T extends Prisma.ParkingSession$bookingArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParkingSession$bookingArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the ParkingSession model
 */
export interface ParkingSessionFieldRefs {
    readonly id: Prisma.FieldRef<"ParkingSession", 'String'>;
    readonly vehicleId: Prisma.FieldRef<"ParkingSession", 'String'>;
    readonly slotId: Prisma.FieldRef<"ParkingSession", 'String'>;
    readonly entryTime: Prisma.FieldRef<"ParkingSession", 'DateTime'>;
    readonly exitTime: Prisma.FieldRef<"ParkingSession", 'DateTime'>;
    readonly duration: Prisma.FieldRef<"ParkingSession", 'Int'>;
    readonly cost: Prisma.FieldRef<"ParkingSession", 'Float'>;
    readonly paymentStatus: Prisma.FieldRef<"ParkingSession", 'PaymentStatus'>;
    readonly bookingId: Prisma.FieldRef<"ParkingSession", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ParkingSession", 'DateTime'>;
}
/**
 * ParkingSession findUnique
 */
export type ParkingSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingSession to fetch.
     */
    where: Prisma.ParkingSessionWhereUniqueInput;
};
/**
 * ParkingSession findUniqueOrThrow
 */
export type ParkingSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingSession to fetch.
     */
    where: Prisma.ParkingSessionWhereUniqueInput;
};
/**
 * ParkingSession findFirst
 */
export type ParkingSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingSession to fetch.
     */
    where?: Prisma.ParkingSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingSessions to fetch.
     */
    orderBy?: Prisma.ParkingSessionOrderByWithRelationInput | Prisma.ParkingSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParkingSessions.
     */
    cursor?: Prisma.ParkingSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingSessions.
     */
    distinct?: Prisma.ParkingSessionScalarFieldEnum | Prisma.ParkingSessionScalarFieldEnum[];
};
/**
 * ParkingSession findFirstOrThrow
 */
export type ParkingSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingSession to fetch.
     */
    where?: Prisma.ParkingSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingSessions to fetch.
     */
    orderBy?: Prisma.ParkingSessionOrderByWithRelationInput | Prisma.ParkingSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParkingSessions.
     */
    cursor?: Prisma.ParkingSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingSessions.
     */
    distinct?: Prisma.ParkingSessionScalarFieldEnum | Prisma.ParkingSessionScalarFieldEnum[];
};
/**
 * ParkingSession findMany
 */
export type ParkingSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingSessions to fetch.
     */
    where?: Prisma.ParkingSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingSessions to fetch.
     */
    orderBy?: Prisma.ParkingSessionOrderByWithRelationInput | Prisma.ParkingSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ParkingSessions.
     */
    cursor?: Prisma.ParkingSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingSessions.
     */
    distinct?: Prisma.ParkingSessionScalarFieldEnum | Prisma.ParkingSessionScalarFieldEnum[];
};
/**
 * ParkingSession create
 */
export type ParkingSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a ParkingSession.
     */
    data: Prisma.XOR<Prisma.ParkingSessionCreateInput, Prisma.ParkingSessionUncheckedCreateInput>;
};
/**
 * ParkingSession createMany
 */
export type ParkingSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParkingSessions.
     */
    data: Prisma.ParkingSessionCreateManyInput | Prisma.ParkingSessionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ParkingSession createManyAndReturn
 */
export type ParkingSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * The data used to create many ParkingSessions.
     */
    data: Prisma.ParkingSessionCreateManyInput | Prisma.ParkingSessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ParkingSession update
 */
export type ParkingSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a ParkingSession.
     */
    data: Prisma.XOR<Prisma.ParkingSessionUpdateInput, Prisma.ParkingSessionUncheckedUpdateInput>;
    /**
     * Choose, which ParkingSession to update.
     */
    where: Prisma.ParkingSessionWhereUniqueInput;
};
/**
 * ParkingSession updateMany
 */
export type ParkingSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ParkingSessions.
     */
    data: Prisma.XOR<Prisma.ParkingSessionUpdateManyMutationInput, Prisma.ParkingSessionUncheckedUpdateManyInput>;
    /**
     * Filter which ParkingSessions to update
     */
    where?: Prisma.ParkingSessionWhereInput;
    /**
     * Limit how many ParkingSessions to update.
     */
    limit?: number;
};
/**
 * ParkingSession updateManyAndReturn
 */
export type ParkingSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * The data used to update ParkingSessions.
     */
    data: Prisma.XOR<Prisma.ParkingSessionUpdateManyMutationInput, Prisma.ParkingSessionUncheckedUpdateManyInput>;
    /**
     * Filter which ParkingSessions to update
     */
    where?: Prisma.ParkingSessionWhereInput;
    /**
     * Limit how many ParkingSessions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ParkingSession upsert
 */
export type ParkingSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the ParkingSession to update in case it exists.
     */
    where: Prisma.ParkingSessionWhereUniqueInput;
    /**
     * In case the ParkingSession found by the `where` argument doesn't exist, create a new ParkingSession with this data.
     */
    create: Prisma.XOR<Prisma.ParkingSessionCreateInput, Prisma.ParkingSessionUncheckedCreateInput>;
    /**
     * In case the ParkingSession was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ParkingSessionUpdateInput, Prisma.ParkingSessionUncheckedUpdateInput>;
};
/**
 * ParkingSession delete
 */
export type ParkingSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
    /**
     * Filter which ParkingSession to delete.
     */
    where: Prisma.ParkingSessionWhereUniqueInput;
};
/**
 * ParkingSession deleteMany
 */
export type ParkingSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingSessions to delete
     */
    where?: Prisma.ParkingSessionWhereInput;
    /**
     * Limit how many ParkingSessions to delete.
     */
    limit?: number;
};
/**
 * ParkingSession.booking
 */
export type ParkingSession$bookingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
};
/**
 * ParkingSession without action
 */
export type ParkingSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSession
     */
    select?: Prisma.ParkingSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSession
     */
    omit?: Prisma.ParkingSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSessionInclude<ExtArgs> | null;
};
//# sourceMappingURL=ParkingSession.d.ts.map