import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ParkingLot
 *
 */
export type ParkingLotModel = runtime.Types.Result.DefaultSelection<Prisma.$ParkingLotPayload>;
export type AggregateParkingLot = {
    _count: ParkingLotCountAggregateOutputType | null;
    _avg: ParkingLotAvgAggregateOutputType | null;
    _sum: ParkingLotSumAggregateOutputType | null;
    _min: ParkingLotMinAggregateOutputType | null;
    _max: ParkingLotMaxAggregateOutputType | null;
};
export type ParkingLotAvgAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    floors: number | null;
    totalSlots: number | null;
    ratePerHour: number | null;
};
export type ParkingLotSumAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    floors: number | null;
    totalSlots: number | null;
    ratePerHour: number | null;
};
export type ParkingLotMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    floors: number | null;
    totalSlots: number | null;
    ratePerHour: number | null;
    entryNodeId: string | null;
    createdAt: Date | null;
};
export type ParkingLotMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    floors: number | null;
    totalSlots: number | null;
    ratePerHour: number | null;
    entryNodeId: string | null;
    createdAt: Date | null;
};
export type ParkingLotCountAggregateOutputType = {
    id: number;
    name: number;
    address: number;
    latitude: number;
    longitude: number;
    floors: number;
    totalSlots: number;
    ratePerHour: number;
    graphData: number;
    entryNodeId: number;
    createdAt: number;
    _all: number;
};
export type ParkingLotAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
    floors?: true;
    totalSlots?: true;
    ratePerHour?: true;
};
export type ParkingLotSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
    floors?: true;
    totalSlots?: true;
    ratePerHour?: true;
};
export type ParkingLotMinAggregateInputType = {
    id?: true;
    name?: true;
    address?: true;
    latitude?: true;
    longitude?: true;
    floors?: true;
    totalSlots?: true;
    ratePerHour?: true;
    entryNodeId?: true;
    createdAt?: true;
};
export type ParkingLotMaxAggregateInputType = {
    id?: true;
    name?: true;
    address?: true;
    latitude?: true;
    longitude?: true;
    floors?: true;
    totalSlots?: true;
    ratePerHour?: true;
    entryNodeId?: true;
    createdAt?: true;
};
export type ParkingLotCountAggregateInputType = {
    id?: true;
    name?: true;
    address?: true;
    latitude?: true;
    longitude?: true;
    floors?: true;
    totalSlots?: true;
    ratePerHour?: true;
    graphData?: true;
    entryNodeId?: true;
    createdAt?: true;
    _all?: true;
};
export type ParkingLotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingLot to aggregate.
     */
    where?: Prisma.ParkingLotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingLots to fetch.
     */
    orderBy?: Prisma.ParkingLotOrderByWithRelationInput | Prisma.ParkingLotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ParkingLotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingLots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingLots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ParkingLots
    **/
    _count?: true | ParkingLotCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ParkingLotAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ParkingLotSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ParkingLotMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ParkingLotMaxAggregateInputType;
};
export type GetParkingLotAggregateType<T extends ParkingLotAggregateArgs> = {
    [P in keyof T & keyof AggregateParkingLot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateParkingLot[P]> : Prisma.GetScalarType<T[P], AggregateParkingLot[P]>;
};
export type ParkingLotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParkingLotWhereInput;
    orderBy?: Prisma.ParkingLotOrderByWithAggregationInput | Prisma.ParkingLotOrderByWithAggregationInput[];
    by: Prisma.ParkingLotScalarFieldEnum[] | Prisma.ParkingLotScalarFieldEnum;
    having?: Prisma.ParkingLotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ParkingLotCountAggregateInputType | true;
    _avg?: ParkingLotAvgAggregateInputType;
    _sum?: ParkingLotSumAggregateInputType;
    _min?: ParkingLotMinAggregateInputType;
    _max?: ParkingLotMaxAggregateInputType;
};
export type ParkingLotGroupByOutputType = {
    id: string;
    name: string;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    floors: number;
    totalSlots: number;
    ratePerHour: number;
    graphData: runtime.JsonValue | null;
    entryNodeId: string | null;
    createdAt: Date;
    _count: ParkingLotCountAggregateOutputType | null;
    _avg: ParkingLotAvgAggregateOutputType | null;
    _sum: ParkingLotSumAggregateOutputType | null;
    _min: ParkingLotMinAggregateOutputType | null;
    _max: ParkingLotMaxAggregateOutputType | null;
};
export type GetParkingLotGroupByPayload<T extends ParkingLotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ParkingLotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ParkingLotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ParkingLotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ParkingLotGroupByOutputType[P]>;
}>>;
export type ParkingLotWhereInput = {
    AND?: Prisma.ParkingLotWhereInput | Prisma.ParkingLotWhereInput[];
    OR?: Prisma.ParkingLotWhereInput[];
    NOT?: Prisma.ParkingLotWhereInput | Prisma.ParkingLotWhereInput[];
    id?: Prisma.StringFilter<"ParkingLot"> | string;
    name?: Prisma.StringFilter<"ParkingLot"> | string;
    address?: Prisma.StringNullableFilter<"ParkingLot"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"ParkingLot"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"ParkingLot"> | number | null;
    floors?: Prisma.IntFilter<"ParkingLot"> | number;
    totalSlots?: Prisma.IntFilter<"ParkingLot"> | number;
    ratePerHour?: Prisma.FloatFilter<"ParkingLot"> | number;
    graphData?: Prisma.JsonNullableFilter<"ParkingLot">;
    entryNodeId?: Prisma.StringNullableFilter<"ParkingLot"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ParkingLot"> | Date | string;
    slots?: Prisma.ParkingSlotListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    analytics?: Prisma.ParkingAnalyticsListRelationFilter;
};
export type ParkingLotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    floors?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    ratePerHour?: Prisma.SortOrder;
    graphData?: Prisma.SortOrderInput | Prisma.SortOrder;
    entryNodeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    slots?: Prisma.ParkingSlotOrderByRelationAggregateInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
    analytics?: Prisma.ParkingAnalyticsOrderByRelationAggregateInput;
};
export type ParkingLotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ParkingLotWhereInput | Prisma.ParkingLotWhereInput[];
    OR?: Prisma.ParkingLotWhereInput[];
    NOT?: Prisma.ParkingLotWhereInput | Prisma.ParkingLotWhereInput[];
    name?: Prisma.StringFilter<"ParkingLot"> | string;
    address?: Prisma.StringNullableFilter<"ParkingLot"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"ParkingLot"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"ParkingLot"> | number | null;
    floors?: Prisma.IntFilter<"ParkingLot"> | number;
    totalSlots?: Prisma.IntFilter<"ParkingLot"> | number;
    ratePerHour?: Prisma.FloatFilter<"ParkingLot"> | number;
    graphData?: Prisma.JsonNullableFilter<"ParkingLot">;
    entryNodeId?: Prisma.StringNullableFilter<"ParkingLot"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ParkingLot"> | Date | string;
    slots?: Prisma.ParkingSlotListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    analytics?: Prisma.ParkingAnalyticsListRelationFilter;
}, "id">;
export type ParkingLotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    floors?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    ratePerHour?: Prisma.SortOrder;
    graphData?: Prisma.SortOrderInput | Prisma.SortOrder;
    entryNodeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ParkingLotCountOrderByAggregateInput;
    _avg?: Prisma.ParkingLotAvgOrderByAggregateInput;
    _max?: Prisma.ParkingLotMaxOrderByAggregateInput;
    _min?: Prisma.ParkingLotMinOrderByAggregateInput;
    _sum?: Prisma.ParkingLotSumOrderByAggregateInput;
};
export type ParkingLotScalarWhereWithAggregatesInput = {
    AND?: Prisma.ParkingLotScalarWhereWithAggregatesInput | Prisma.ParkingLotScalarWhereWithAggregatesInput[];
    OR?: Prisma.ParkingLotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ParkingLotScalarWhereWithAggregatesInput | Prisma.ParkingLotScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ParkingLot"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ParkingLot"> | string;
    address?: Prisma.StringNullableWithAggregatesFilter<"ParkingLot"> | string | null;
    latitude?: Prisma.FloatNullableWithAggregatesFilter<"ParkingLot"> | number | null;
    longitude?: Prisma.FloatNullableWithAggregatesFilter<"ParkingLot"> | number | null;
    floors?: Prisma.IntWithAggregatesFilter<"ParkingLot"> | number;
    totalSlots?: Prisma.IntWithAggregatesFilter<"ParkingLot"> | number;
    ratePerHour?: Prisma.FloatWithAggregatesFilter<"ParkingLot"> | number;
    graphData?: Prisma.JsonNullableWithAggregatesFilter<"ParkingLot">;
    entryNodeId?: Prisma.StringNullableWithAggregatesFilter<"ParkingLot"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ParkingLot"> | Date | string;
};
export type ParkingLotCreateInput = {
    id?: string;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    floors?: number;
    totalSlots?: number;
    ratePerHour?: number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: string | null;
    createdAt?: Date | string;
    slots?: Prisma.ParkingSlotCreateNestedManyWithoutLotInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutLotInput;
    analytics?: Prisma.ParkingAnalyticsCreateNestedManyWithoutLotInput;
};
export type ParkingLotUncheckedCreateInput = {
    id?: string;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    floors?: number;
    totalSlots?: number;
    ratePerHour?: number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: string | null;
    createdAt?: Date | string;
    slots?: Prisma.ParkingSlotUncheckedCreateNestedManyWithoutLotInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutLotInput;
    analytics?: Prisma.ParkingAnalyticsUncheckedCreateNestedManyWithoutLotInput;
};
export type ParkingLotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    slots?: Prisma.ParkingSlotUpdateManyWithoutLotNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutLotNestedInput;
    analytics?: Prisma.ParkingAnalyticsUpdateManyWithoutLotNestedInput;
};
export type ParkingLotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    slots?: Prisma.ParkingSlotUncheckedUpdateManyWithoutLotNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutLotNestedInput;
    analytics?: Prisma.ParkingAnalyticsUncheckedUpdateManyWithoutLotNestedInput;
};
export type ParkingLotCreateManyInput = {
    id?: string;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    floors?: number;
    totalSlots?: number;
    ratePerHour?: number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: string | null;
    createdAt?: Date | string;
};
export type ParkingLotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingLotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParkingLotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    floors?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    ratePerHour?: Prisma.SortOrder;
    graphData?: Prisma.SortOrder;
    entryNodeId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ParkingLotAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    floors?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    ratePerHour?: Prisma.SortOrder;
};
export type ParkingLotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    floors?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    ratePerHour?: Prisma.SortOrder;
    entryNodeId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ParkingLotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    floors?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    ratePerHour?: Prisma.SortOrder;
    entryNodeId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ParkingLotSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    floors?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    ratePerHour?: Prisma.SortOrder;
};
export type ParkingLotScalarRelationFilter = {
    is?: Prisma.ParkingLotWhereInput;
    isNot?: Prisma.ParkingLotWhereInput;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ParkingLotCreateNestedOneWithoutSlotsInput = {
    create?: Prisma.XOR<Prisma.ParkingLotCreateWithoutSlotsInput, Prisma.ParkingLotUncheckedCreateWithoutSlotsInput>;
    connectOrCreate?: Prisma.ParkingLotCreateOrConnectWithoutSlotsInput;
    connect?: Prisma.ParkingLotWhereUniqueInput;
};
export type ParkingLotUpdateOneRequiredWithoutSlotsNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingLotCreateWithoutSlotsInput, Prisma.ParkingLotUncheckedCreateWithoutSlotsInput>;
    connectOrCreate?: Prisma.ParkingLotCreateOrConnectWithoutSlotsInput;
    upsert?: Prisma.ParkingLotUpsertWithoutSlotsInput;
    connect?: Prisma.ParkingLotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ParkingLotUpdateToOneWithWhereWithoutSlotsInput, Prisma.ParkingLotUpdateWithoutSlotsInput>, Prisma.ParkingLotUncheckedUpdateWithoutSlotsInput>;
};
export type ParkingLotCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.ParkingLotCreateWithoutBookingsInput, Prisma.ParkingLotUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ParkingLotCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.ParkingLotWhereUniqueInput;
};
export type ParkingLotUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingLotCreateWithoutBookingsInput, Prisma.ParkingLotUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ParkingLotCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.ParkingLotUpsertWithoutBookingsInput;
    connect?: Prisma.ParkingLotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ParkingLotUpdateToOneWithWhereWithoutBookingsInput, Prisma.ParkingLotUpdateWithoutBookingsInput>, Prisma.ParkingLotUncheckedUpdateWithoutBookingsInput>;
};
export type ParkingLotCreateNestedOneWithoutAnalyticsInput = {
    create?: Prisma.XOR<Prisma.ParkingLotCreateWithoutAnalyticsInput, Prisma.ParkingLotUncheckedCreateWithoutAnalyticsInput>;
    connectOrCreate?: Prisma.ParkingLotCreateOrConnectWithoutAnalyticsInput;
    connect?: Prisma.ParkingLotWhereUniqueInput;
};
export type ParkingLotUpdateOneRequiredWithoutAnalyticsNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingLotCreateWithoutAnalyticsInput, Prisma.ParkingLotUncheckedCreateWithoutAnalyticsInput>;
    connectOrCreate?: Prisma.ParkingLotCreateOrConnectWithoutAnalyticsInput;
    upsert?: Prisma.ParkingLotUpsertWithoutAnalyticsInput;
    connect?: Prisma.ParkingLotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ParkingLotUpdateToOneWithWhereWithoutAnalyticsInput, Prisma.ParkingLotUpdateWithoutAnalyticsInput>, Prisma.ParkingLotUncheckedUpdateWithoutAnalyticsInput>;
};
export type ParkingLotCreateWithoutSlotsInput = {
    id?: string;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    floors?: number;
    totalSlots?: number;
    ratePerHour?: number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: string | null;
    createdAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutLotInput;
    analytics?: Prisma.ParkingAnalyticsCreateNestedManyWithoutLotInput;
};
export type ParkingLotUncheckedCreateWithoutSlotsInput = {
    id?: string;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    floors?: number;
    totalSlots?: number;
    ratePerHour?: number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: string | null;
    createdAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutLotInput;
    analytics?: Prisma.ParkingAnalyticsUncheckedCreateNestedManyWithoutLotInput;
};
export type ParkingLotCreateOrConnectWithoutSlotsInput = {
    where: Prisma.ParkingLotWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingLotCreateWithoutSlotsInput, Prisma.ParkingLotUncheckedCreateWithoutSlotsInput>;
};
export type ParkingLotUpsertWithoutSlotsInput = {
    update: Prisma.XOR<Prisma.ParkingLotUpdateWithoutSlotsInput, Prisma.ParkingLotUncheckedUpdateWithoutSlotsInput>;
    create: Prisma.XOR<Prisma.ParkingLotCreateWithoutSlotsInput, Prisma.ParkingLotUncheckedCreateWithoutSlotsInput>;
    where?: Prisma.ParkingLotWhereInput;
};
export type ParkingLotUpdateToOneWithWhereWithoutSlotsInput = {
    where?: Prisma.ParkingLotWhereInput;
    data: Prisma.XOR<Prisma.ParkingLotUpdateWithoutSlotsInput, Prisma.ParkingLotUncheckedUpdateWithoutSlotsInput>;
};
export type ParkingLotUpdateWithoutSlotsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutLotNestedInput;
    analytics?: Prisma.ParkingAnalyticsUpdateManyWithoutLotNestedInput;
};
export type ParkingLotUncheckedUpdateWithoutSlotsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutLotNestedInput;
    analytics?: Prisma.ParkingAnalyticsUncheckedUpdateManyWithoutLotNestedInput;
};
export type ParkingLotCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    floors?: number;
    totalSlots?: number;
    ratePerHour?: number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: string | null;
    createdAt?: Date | string;
    slots?: Prisma.ParkingSlotCreateNestedManyWithoutLotInput;
    analytics?: Prisma.ParkingAnalyticsCreateNestedManyWithoutLotInput;
};
export type ParkingLotUncheckedCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    floors?: number;
    totalSlots?: number;
    ratePerHour?: number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: string | null;
    createdAt?: Date | string;
    slots?: Prisma.ParkingSlotUncheckedCreateNestedManyWithoutLotInput;
    analytics?: Prisma.ParkingAnalyticsUncheckedCreateNestedManyWithoutLotInput;
};
export type ParkingLotCreateOrConnectWithoutBookingsInput = {
    where: Prisma.ParkingLotWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingLotCreateWithoutBookingsInput, Prisma.ParkingLotUncheckedCreateWithoutBookingsInput>;
};
export type ParkingLotUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.ParkingLotUpdateWithoutBookingsInput, Prisma.ParkingLotUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.ParkingLotCreateWithoutBookingsInput, Prisma.ParkingLotUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.ParkingLotWhereInput;
};
export type ParkingLotUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.ParkingLotWhereInput;
    data: Prisma.XOR<Prisma.ParkingLotUpdateWithoutBookingsInput, Prisma.ParkingLotUncheckedUpdateWithoutBookingsInput>;
};
export type ParkingLotUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    slots?: Prisma.ParkingSlotUpdateManyWithoutLotNestedInput;
    analytics?: Prisma.ParkingAnalyticsUpdateManyWithoutLotNestedInput;
};
export type ParkingLotUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    slots?: Prisma.ParkingSlotUncheckedUpdateManyWithoutLotNestedInput;
    analytics?: Prisma.ParkingAnalyticsUncheckedUpdateManyWithoutLotNestedInput;
};
export type ParkingLotCreateWithoutAnalyticsInput = {
    id?: string;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    floors?: number;
    totalSlots?: number;
    ratePerHour?: number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: string | null;
    createdAt?: Date | string;
    slots?: Prisma.ParkingSlotCreateNestedManyWithoutLotInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutLotInput;
};
export type ParkingLotUncheckedCreateWithoutAnalyticsInput = {
    id?: string;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    floors?: number;
    totalSlots?: number;
    ratePerHour?: number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: string | null;
    createdAt?: Date | string;
    slots?: Prisma.ParkingSlotUncheckedCreateNestedManyWithoutLotInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutLotInput;
};
export type ParkingLotCreateOrConnectWithoutAnalyticsInput = {
    where: Prisma.ParkingLotWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingLotCreateWithoutAnalyticsInput, Prisma.ParkingLotUncheckedCreateWithoutAnalyticsInput>;
};
export type ParkingLotUpsertWithoutAnalyticsInput = {
    update: Prisma.XOR<Prisma.ParkingLotUpdateWithoutAnalyticsInput, Prisma.ParkingLotUncheckedUpdateWithoutAnalyticsInput>;
    create: Prisma.XOR<Prisma.ParkingLotCreateWithoutAnalyticsInput, Prisma.ParkingLotUncheckedCreateWithoutAnalyticsInput>;
    where?: Prisma.ParkingLotWhereInput;
};
export type ParkingLotUpdateToOneWithWhereWithoutAnalyticsInput = {
    where?: Prisma.ParkingLotWhereInput;
    data: Prisma.XOR<Prisma.ParkingLotUpdateWithoutAnalyticsInput, Prisma.ParkingLotUncheckedUpdateWithoutAnalyticsInput>;
};
export type ParkingLotUpdateWithoutAnalyticsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    slots?: Prisma.ParkingSlotUpdateManyWithoutLotNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutLotNestedInput;
};
export type ParkingLotUncheckedUpdateWithoutAnalyticsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    floors?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    ratePerHour?: Prisma.FloatFieldUpdateOperationsInput | number;
    graphData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entryNodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    slots?: Prisma.ParkingSlotUncheckedUpdateManyWithoutLotNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutLotNestedInput;
};
/**
 * Count Type ParkingLotCountOutputType
 */
export type ParkingLotCountOutputType = {
    slots: number;
    bookings: number;
    analytics: number;
};
export type ParkingLotCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    slots?: boolean | ParkingLotCountOutputTypeCountSlotsArgs;
    bookings?: boolean | ParkingLotCountOutputTypeCountBookingsArgs;
    analytics?: boolean | ParkingLotCountOutputTypeCountAnalyticsArgs;
};
/**
 * ParkingLotCountOutputType without action
 */
export type ParkingLotCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLotCountOutputType
     */
    select?: Prisma.ParkingLotCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ParkingLotCountOutputType without action
 */
export type ParkingLotCountOutputTypeCountSlotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParkingSlotWhereInput;
};
/**
 * ParkingLotCountOutputType without action
 */
export type ParkingLotCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
/**
 * ParkingLotCountOutputType without action
 */
export type ParkingLotCountOutputTypeCountAnalyticsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParkingAnalyticsWhereInput;
};
export type ParkingLotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    floors?: boolean;
    totalSlots?: boolean;
    ratePerHour?: boolean;
    graphData?: boolean;
    entryNodeId?: boolean;
    createdAt?: boolean;
    slots?: boolean | Prisma.ParkingLot$slotsArgs<ExtArgs>;
    bookings?: boolean | Prisma.ParkingLot$bookingsArgs<ExtArgs>;
    analytics?: boolean | Prisma.ParkingLot$analyticsArgs<ExtArgs>;
    _count?: boolean | Prisma.ParkingLotCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parkingLot"]>;
export type ParkingLotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    floors?: boolean;
    totalSlots?: boolean;
    ratePerHour?: boolean;
    graphData?: boolean;
    entryNodeId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["parkingLot"]>;
export type ParkingLotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    floors?: boolean;
    totalSlots?: boolean;
    ratePerHour?: boolean;
    graphData?: boolean;
    entryNodeId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["parkingLot"]>;
export type ParkingLotSelectScalar = {
    id?: boolean;
    name?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    floors?: boolean;
    totalSlots?: boolean;
    ratePerHour?: boolean;
    graphData?: boolean;
    entryNodeId?: boolean;
    createdAt?: boolean;
};
export type ParkingLotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "address" | "latitude" | "longitude" | "floors" | "totalSlots" | "ratePerHour" | "graphData" | "entryNodeId" | "createdAt", ExtArgs["result"]["parkingLot"]>;
export type ParkingLotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    slots?: boolean | Prisma.ParkingLot$slotsArgs<ExtArgs>;
    bookings?: boolean | Prisma.ParkingLot$bookingsArgs<ExtArgs>;
    analytics?: boolean | Prisma.ParkingLot$analyticsArgs<ExtArgs>;
    _count?: boolean | Prisma.ParkingLotCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ParkingLotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ParkingLotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ParkingLotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ParkingLot";
    objects: {
        slots: Prisma.$ParkingSlotPayload<ExtArgs>[];
        bookings: Prisma.$BookingPayload<ExtArgs>[];
        analytics: Prisma.$ParkingAnalyticsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        address: string | null;
        latitude: number | null;
        longitude: number | null;
        floors: number;
        totalSlots: number;
        ratePerHour: number;
        graphData: runtime.JsonValue | null;
        entryNodeId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["parkingLot"]>;
    composites: {};
};
export type ParkingLotGetPayload<S extends boolean | null | undefined | ParkingLotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload, S>;
export type ParkingLotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ParkingLotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ParkingLotCountAggregateInputType | true;
};
export interface ParkingLotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ParkingLot'];
        meta: {
            name: 'ParkingLot';
        };
    };
    /**
     * Find zero or one ParkingLot that matches the filter.
     * @param {ParkingLotFindUniqueArgs} args - Arguments to find a ParkingLot
     * @example
     * // Get one ParkingLot
     * const parkingLot = await prisma.parkingLot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParkingLotFindUniqueArgs>(args: Prisma.SelectSubset<T, ParkingLotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ParkingLot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParkingLotFindUniqueOrThrowArgs} args - Arguments to find a ParkingLot
     * @example
     * // Get one ParkingLot
     * const parkingLot = await prisma.parkingLot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParkingLotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ParkingLotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParkingLot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLotFindFirstArgs} args - Arguments to find a ParkingLot
     * @example
     * // Get one ParkingLot
     * const parkingLot = await prisma.parkingLot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParkingLotFindFirstArgs>(args?: Prisma.SelectSubset<T, ParkingLotFindFirstArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParkingLot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLotFindFirstOrThrowArgs} args - Arguments to find a ParkingLot
     * @example
     * // Get one ParkingLot
     * const parkingLot = await prisma.parkingLot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParkingLotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ParkingLotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ParkingLots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParkingLots
     * const parkingLots = await prisma.parkingLot.findMany()
     *
     * // Get first 10 ParkingLots
     * const parkingLots = await prisma.parkingLot.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const parkingLotWithIdOnly = await prisma.parkingLot.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ParkingLotFindManyArgs>(args?: Prisma.SelectSubset<T, ParkingLotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ParkingLot.
     * @param {ParkingLotCreateArgs} args - Arguments to create a ParkingLot.
     * @example
     * // Create one ParkingLot
     * const ParkingLot = await prisma.parkingLot.create({
     *   data: {
     *     // ... data to create a ParkingLot
     *   }
     * })
     *
     */
    create<T extends ParkingLotCreateArgs>(args: Prisma.SelectSubset<T, ParkingLotCreateArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ParkingLots.
     * @param {ParkingLotCreateManyArgs} args - Arguments to create many ParkingLots.
     * @example
     * // Create many ParkingLots
     * const parkingLot = await prisma.parkingLot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ParkingLotCreateManyArgs>(args?: Prisma.SelectSubset<T, ParkingLotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ParkingLots and returns the data saved in the database.
     * @param {ParkingLotCreateManyAndReturnArgs} args - Arguments to create many ParkingLots.
     * @example
     * // Create many ParkingLots
     * const parkingLot = await prisma.parkingLot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ParkingLots and only return the `id`
     * const parkingLotWithIdOnly = await prisma.parkingLot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ParkingLotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ParkingLotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ParkingLot.
     * @param {ParkingLotDeleteArgs} args - Arguments to delete one ParkingLot.
     * @example
     * // Delete one ParkingLot
     * const ParkingLot = await prisma.parkingLot.delete({
     *   where: {
     *     // ... filter to delete one ParkingLot
     *   }
     * })
     *
     */
    delete<T extends ParkingLotDeleteArgs>(args: Prisma.SelectSubset<T, ParkingLotDeleteArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ParkingLot.
     * @param {ParkingLotUpdateArgs} args - Arguments to update one ParkingLot.
     * @example
     * // Update one ParkingLot
     * const parkingLot = await prisma.parkingLot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ParkingLotUpdateArgs>(args: Prisma.SelectSubset<T, ParkingLotUpdateArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ParkingLots.
     * @param {ParkingLotDeleteManyArgs} args - Arguments to filter ParkingLots to delete.
     * @example
     * // Delete a few ParkingLots
     * const { count } = await prisma.parkingLot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ParkingLotDeleteManyArgs>(args?: Prisma.SelectSubset<T, ParkingLotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParkingLots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParkingLots
     * const parkingLot = await prisma.parkingLot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ParkingLotUpdateManyArgs>(args: Prisma.SelectSubset<T, ParkingLotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParkingLots and returns the data updated in the database.
     * @param {ParkingLotUpdateManyAndReturnArgs} args - Arguments to update many ParkingLots.
     * @example
     * // Update many ParkingLots
     * const parkingLot = await prisma.parkingLot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ParkingLots and only return the `id`
     * const parkingLotWithIdOnly = await prisma.parkingLot.updateManyAndReturn({
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
    updateManyAndReturn<T extends ParkingLotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ParkingLotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ParkingLot.
     * @param {ParkingLotUpsertArgs} args - Arguments to update or create a ParkingLot.
     * @example
     * // Update or create a ParkingLot
     * const parkingLot = await prisma.parkingLot.upsert({
     *   create: {
     *     // ... data to create a ParkingLot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParkingLot we want to update
     *   }
     * })
     */
    upsert<T extends ParkingLotUpsertArgs>(args: Prisma.SelectSubset<T, ParkingLotUpsertArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ParkingLots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLotCountArgs} args - Arguments to filter ParkingLots to count.
     * @example
     * // Count the number of ParkingLots
     * const count = await prisma.parkingLot.count({
     *   where: {
     *     // ... the filter for the ParkingLots we want to count
     *   }
     * })
    **/
    count<T extends ParkingLotCountArgs>(args?: Prisma.Subset<T, ParkingLotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ParkingLotCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ParkingLot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ParkingLotAggregateArgs>(args: Prisma.Subset<T, ParkingLotAggregateArgs>): Prisma.PrismaPromise<GetParkingLotAggregateType<T>>;
    /**
     * Group by ParkingLot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLotGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ParkingLotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ParkingLotGroupByArgs['orderBy'];
    } : {
        orderBy?: ParkingLotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ParkingLotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParkingLotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ParkingLot model
     */
    readonly fields: ParkingLotFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ParkingLot.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ParkingLotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    slots<T extends Prisma.ParkingLot$slotsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParkingLot$slotsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.ParkingLot$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParkingLot$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    analytics<T extends Prisma.ParkingLot$analyticsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParkingLot$analyticsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the ParkingLot model
 */
export interface ParkingLotFieldRefs {
    readonly id: Prisma.FieldRef<"ParkingLot", 'String'>;
    readonly name: Prisma.FieldRef<"ParkingLot", 'String'>;
    readonly address: Prisma.FieldRef<"ParkingLot", 'String'>;
    readonly latitude: Prisma.FieldRef<"ParkingLot", 'Float'>;
    readonly longitude: Prisma.FieldRef<"ParkingLot", 'Float'>;
    readonly floors: Prisma.FieldRef<"ParkingLot", 'Int'>;
    readonly totalSlots: Prisma.FieldRef<"ParkingLot", 'Int'>;
    readonly ratePerHour: Prisma.FieldRef<"ParkingLot", 'Float'>;
    readonly graphData: Prisma.FieldRef<"ParkingLot", 'Json'>;
    readonly entryNodeId: Prisma.FieldRef<"ParkingLot", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ParkingLot", 'DateTime'>;
}
/**
 * ParkingLot findUnique
 */
export type ParkingLotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingLot to fetch.
     */
    where: Prisma.ParkingLotWhereUniqueInput;
};
/**
 * ParkingLot findUniqueOrThrow
 */
export type ParkingLotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingLot to fetch.
     */
    where: Prisma.ParkingLotWhereUniqueInput;
};
/**
 * ParkingLot findFirst
 */
export type ParkingLotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingLot to fetch.
     */
    where?: Prisma.ParkingLotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingLots to fetch.
     */
    orderBy?: Prisma.ParkingLotOrderByWithRelationInput | Prisma.ParkingLotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParkingLots.
     */
    cursor?: Prisma.ParkingLotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingLots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingLots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingLots.
     */
    distinct?: Prisma.ParkingLotScalarFieldEnum | Prisma.ParkingLotScalarFieldEnum[];
};
/**
 * ParkingLot findFirstOrThrow
 */
export type ParkingLotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingLot to fetch.
     */
    where?: Prisma.ParkingLotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingLots to fetch.
     */
    orderBy?: Prisma.ParkingLotOrderByWithRelationInput | Prisma.ParkingLotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParkingLots.
     */
    cursor?: Prisma.ParkingLotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingLots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingLots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingLots.
     */
    distinct?: Prisma.ParkingLotScalarFieldEnum | Prisma.ParkingLotScalarFieldEnum[];
};
/**
 * ParkingLot findMany
 */
export type ParkingLotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
    /**
     * Filter, which ParkingLots to fetch.
     */
    where?: Prisma.ParkingLotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingLots to fetch.
     */
    orderBy?: Prisma.ParkingLotOrderByWithRelationInput | Prisma.ParkingLotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ParkingLots.
     */
    cursor?: Prisma.ParkingLotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingLots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingLots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingLots.
     */
    distinct?: Prisma.ParkingLotScalarFieldEnum | Prisma.ParkingLotScalarFieldEnum[];
};
/**
 * ParkingLot create
 */
export type ParkingLotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
    /**
     * The data needed to create a ParkingLot.
     */
    data: Prisma.XOR<Prisma.ParkingLotCreateInput, Prisma.ParkingLotUncheckedCreateInput>;
};
/**
 * ParkingLot createMany
 */
export type ParkingLotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParkingLots.
     */
    data: Prisma.ParkingLotCreateManyInput | Prisma.ParkingLotCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ParkingLot createManyAndReturn
 */
export type ParkingLotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * The data used to create many ParkingLots.
     */
    data: Prisma.ParkingLotCreateManyInput | Prisma.ParkingLotCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ParkingLot update
 */
export type ParkingLotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
    /**
     * The data needed to update a ParkingLot.
     */
    data: Prisma.XOR<Prisma.ParkingLotUpdateInput, Prisma.ParkingLotUncheckedUpdateInput>;
    /**
     * Choose, which ParkingLot to update.
     */
    where: Prisma.ParkingLotWhereUniqueInput;
};
/**
 * ParkingLot updateMany
 */
export type ParkingLotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ParkingLots.
     */
    data: Prisma.XOR<Prisma.ParkingLotUpdateManyMutationInput, Prisma.ParkingLotUncheckedUpdateManyInput>;
    /**
     * Filter which ParkingLots to update
     */
    where?: Prisma.ParkingLotWhereInput;
    /**
     * Limit how many ParkingLots to update.
     */
    limit?: number;
};
/**
 * ParkingLot updateManyAndReturn
 */
export type ParkingLotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * The data used to update ParkingLots.
     */
    data: Prisma.XOR<Prisma.ParkingLotUpdateManyMutationInput, Prisma.ParkingLotUncheckedUpdateManyInput>;
    /**
     * Filter which ParkingLots to update
     */
    where?: Prisma.ParkingLotWhereInput;
    /**
     * Limit how many ParkingLots to update.
     */
    limit?: number;
};
/**
 * ParkingLot upsert
 */
export type ParkingLotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
    /**
     * The filter to search for the ParkingLot to update in case it exists.
     */
    where: Prisma.ParkingLotWhereUniqueInput;
    /**
     * In case the ParkingLot found by the `where` argument doesn't exist, create a new ParkingLot with this data.
     */
    create: Prisma.XOR<Prisma.ParkingLotCreateInput, Prisma.ParkingLotUncheckedCreateInput>;
    /**
     * In case the ParkingLot was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ParkingLotUpdateInput, Prisma.ParkingLotUncheckedUpdateInput>;
};
/**
 * ParkingLot delete
 */
export type ParkingLotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
    /**
     * Filter which ParkingLot to delete.
     */
    where: Prisma.ParkingLotWhereUniqueInput;
};
/**
 * ParkingLot deleteMany
 */
export type ParkingLotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingLots to delete
     */
    where?: Prisma.ParkingLotWhereInput;
    /**
     * Limit how many ParkingLots to delete.
     */
    limit?: number;
};
/**
 * ParkingLot.slots
 */
export type ParkingLot$slotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSlot
     */
    select?: Prisma.ParkingSlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSlot
     */
    omit?: Prisma.ParkingSlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSlotInclude<ExtArgs> | null;
    where?: Prisma.ParkingSlotWhereInput;
    orderBy?: Prisma.ParkingSlotOrderByWithRelationInput | Prisma.ParkingSlotOrderByWithRelationInput[];
    cursor?: Prisma.ParkingSlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParkingSlotScalarFieldEnum | Prisma.ParkingSlotScalarFieldEnum[];
};
/**
 * ParkingLot.bookings
 */
export type ParkingLot$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
/**
 * ParkingLot.analytics
 */
export type ParkingLot$analyticsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingAnalytics
     */
    select?: Prisma.ParkingAnalyticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingAnalytics
     */
    omit?: Prisma.ParkingAnalyticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingAnalyticsInclude<ExtArgs> | null;
    where?: Prisma.ParkingAnalyticsWhereInput;
    orderBy?: Prisma.ParkingAnalyticsOrderByWithRelationInput | Prisma.ParkingAnalyticsOrderByWithRelationInput[];
    cursor?: Prisma.ParkingAnalyticsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParkingAnalyticsScalarFieldEnum | Prisma.ParkingAnalyticsScalarFieldEnum[];
};
/**
 * ParkingLot without action
 */
export type ParkingLotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLot
     */
    select?: Prisma.ParkingLotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingLot
     */
    omit?: Prisma.ParkingLotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingLotInclude<ExtArgs> | null;
};
//# sourceMappingURL=ParkingLot.d.ts.map