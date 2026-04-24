import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ParkingSlot
 *
 */
export type ParkingSlotModel = runtime.Types.Result.DefaultSelection<Prisma.$ParkingSlotPayload>;
export type AggregateParkingSlot = {
    _count: ParkingSlotCountAggregateOutputType | null;
    _avg: ParkingSlotAvgAggregateOutputType | null;
    _sum: ParkingSlotSumAggregateOutputType | null;
    _min: ParkingSlotMinAggregateOutputType | null;
    _max: ParkingSlotMaxAggregateOutputType | null;
};
export type ParkingSlotAvgAggregateOutputType = {
    number: number | null;
    floor: number | null;
    xCoord: number | null;
    yCoord: number | null;
};
export type ParkingSlotSumAggregateOutputType = {
    number: number | null;
    floor: number | null;
    xCoord: number | null;
    yCoord: number | null;
};
export type ParkingSlotMinAggregateOutputType = {
    id: string | null;
    block: string | null;
    number: number | null;
    floor: number | null;
    type: $Enums.SlotType | null;
    status: $Enums.SlotStatus | null;
    xCoord: number | null;
    yCoord: number | null;
    nodeId: string | null;
    lotId: string | null;
};
export type ParkingSlotMaxAggregateOutputType = {
    id: string | null;
    block: string | null;
    number: number | null;
    floor: number | null;
    type: $Enums.SlotType | null;
    status: $Enums.SlotStatus | null;
    xCoord: number | null;
    yCoord: number | null;
    nodeId: string | null;
    lotId: string | null;
};
export type ParkingSlotCountAggregateOutputType = {
    id: number;
    block: number;
    number: number;
    floor: number;
    type: number;
    status: number;
    xCoord: number;
    yCoord: number;
    nodeId: number;
    features: number;
    lotId: number;
    _all: number;
};
export type ParkingSlotAvgAggregateInputType = {
    number?: true;
    floor?: true;
    xCoord?: true;
    yCoord?: true;
};
export type ParkingSlotSumAggregateInputType = {
    number?: true;
    floor?: true;
    xCoord?: true;
    yCoord?: true;
};
export type ParkingSlotMinAggregateInputType = {
    id?: true;
    block?: true;
    number?: true;
    floor?: true;
    type?: true;
    status?: true;
    xCoord?: true;
    yCoord?: true;
    nodeId?: true;
    lotId?: true;
};
export type ParkingSlotMaxAggregateInputType = {
    id?: true;
    block?: true;
    number?: true;
    floor?: true;
    type?: true;
    status?: true;
    xCoord?: true;
    yCoord?: true;
    nodeId?: true;
    lotId?: true;
};
export type ParkingSlotCountAggregateInputType = {
    id?: true;
    block?: true;
    number?: true;
    floor?: true;
    type?: true;
    status?: true;
    xCoord?: true;
    yCoord?: true;
    nodeId?: true;
    features?: true;
    lotId?: true;
    _all?: true;
};
export type ParkingSlotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingSlot to aggregate.
     */
    where?: Prisma.ParkingSlotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingSlots to fetch.
     */
    orderBy?: Prisma.ParkingSlotOrderByWithRelationInput | Prisma.ParkingSlotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ParkingSlotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingSlots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingSlots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ParkingSlots
    **/
    _count?: true | ParkingSlotCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ParkingSlotAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ParkingSlotSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ParkingSlotMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ParkingSlotMaxAggregateInputType;
};
export type GetParkingSlotAggregateType<T extends ParkingSlotAggregateArgs> = {
    [P in keyof T & keyof AggregateParkingSlot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateParkingSlot[P]> : Prisma.GetScalarType<T[P], AggregateParkingSlot[P]>;
};
export type ParkingSlotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParkingSlotWhereInput;
    orderBy?: Prisma.ParkingSlotOrderByWithAggregationInput | Prisma.ParkingSlotOrderByWithAggregationInput[];
    by: Prisma.ParkingSlotScalarFieldEnum[] | Prisma.ParkingSlotScalarFieldEnum;
    having?: Prisma.ParkingSlotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ParkingSlotCountAggregateInputType | true;
    _avg?: ParkingSlotAvgAggregateInputType;
    _sum?: ParkingSlotSumAggregateInputType;
    _min?: ParkingSlotMinAggregateInputType;
    _max?: ParkingSlotMaxAggregateInputType;
};
export type ParkingSlotGroupByOutputType = {
    id: string;
    block: string;
    number: number;
    floor: number;
    type: $Enums.SlotType;
    status: $Enums.SlotStatus;
    xCoord: number | null;
    yCoord: number | null;
    nodeId: string | null;
    features: string[];
    lotId: string;
    _count: ParkingSlotCountAggregateOutputType | null;
    _avg: ParkingSlotAvgAggregateOutputType | null;
    _sum: ParkingSlotSumAggregateOutputType | null;
    _min: ParkingSlotMinAggregateOutputType | null;
    _max: ParkingSlotMaxAggregateOutputType | null;
};
export type GetParkingSlotGroupByPayload<T extends ParkingSlotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ParkingSlotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ParkingSlotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ParkingSlotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ParkingSlotGroupByOutputType[P]>;
}>>;
export type ParkingSlotWhereInput = {
    AND?: Prisma.ParkingSlotWhereInput | Prisma.ParkingSlotWhereInput[];
    OR?: Prisma.ParkingSlotWhereInput[];
    NOT?: Prisma.ParkingSlotWhereInput | Prisma.ParkingSlotWhereInput[];
    id?: Prisma.StringFilter<"ParkingSlot"> | string;
    block?: Prisma.StringFilter<"ParkingSlot"> | string;
    number?: Prisma.IntFilter<"ParkingSlot"> | number;
    floor?: Prisma.IntFilter<"ParkingSlot"> | number;
    type?: Prisma.EnumSlotTypeFilter<"ParkingSlot"> | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFilter<"ParkingSlot"> | $Enums.SlotStatus;
    xCoord?: Prisma.FloatNullableFilter<"ParkingSlot"> | number | null;
    yCoord?: Prisma.FloatNullableFilter<"ParkingSlot"> | number | null;
    nodeId?: Prisma.StringNullableFilter<"ParkingSlot"> | string | null;
    features?: Prisma.StringNullableListFilter<"ParkingSlot">;
    lotId?: Prisma.StringFilter<"ParkingSlot"> | string;
    lot?: Prisma.XOR<Prisma.ParkingLotScalarRelationFilter, Prisma.ParkingLotWhereInput>;
    sessions?: Prisma.ParkingSessionListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
};
export type ParkingSlotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    block?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    xCoord?: Prisma.SortOrderInput | Prisma.SortOrder;
    yCoord?: Prisma.SortOrderInput | Prisma.SortOrder;
    nodeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    features?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    lot?: Prisma.ParkingLotOrderByWithRelationInput;
    sessions?: Prisma.ParkingSessionOrderByRelationAggregateInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type ParkingSlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    lotId_block_number_floor?: Prisma.ParkingSlotLotIdBlockNumberFloorCompoundUniqueInput;
    AND?: Prisma.ParkingSlotWhereInput | Prisma.ParkingSlotWhereInput[];
    OR?: Prisma.ParkingSlotWhereInput[];
    NOT?: Prisma.ParkingSlotWhereInput | Prisma.ParkingSlotWhereInput[];
    block?: Prisma.StringFilter<"ParkingSlot"> | string;
    number?: Prisma.IntFilter<"ParkingSlot"> | number;
    floor?: Prisma.IntFilter<"ParkingSlot"> | number;
    type?: Prisma.EnumSlotTypeFilter<"ParkingSlot"> | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFilter<"ParkingSlot"> | $Enums.SlotStatus;
    xCoord?: Prisma.FloatNullableFilter<"ParkingSlot"> | number | null;
    yCoord?: Prisma.FloatNullableFilter<"ParkingSlot"> | number | null;
    nodeId?: Prisma.StringNullableFilter<"ParkingSlot"> | string | null;
    features?: Prisma.StringNullableListFilter<"ParkingSlot">;
    lotId?: Prisma.StringFilter<"ParkingSlot"> | string;
    lot?: Prisma.XOR<Prisma.ParkingLotScalarRelationFilter, Prisma.ParkingLotWhereInput>;
    sessions?: Prisma.ParkingSessionListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
}, "id" | "lotId_block_number_floor">;
export type ParkingSlotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    block?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    xCoord?: Prisma.SortOrderInput | Prisma.SortOrder;
    yCoord?: Prisma.SortOrderInput | Prisma.SortOrder;
    nodeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    features?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    _count?: Prisma.ParkingSlotCountOrderByAggregateInput;
    _avg?: Prisma.ParkingSlotAvgOrderByAggregateInput;
    _max?: Prisma.ParkingSlotMaxOrderByAggregateInput;
    _min?: Prisma.ParkingSlotMinOrderByAggregateInput;
    _sum?: Prisma.ParkingSlotSumOrderByAggregateInput;
};
export type ParkingSlotScalarWhereWithAggregatesInput = {
    AND?: Prisma.ParkingSlotScalarWhereWithAggregatesInput | Prisma.ParkingSlotScalarWhereWithAggregatesInput[];
    OR?: Prisma.ParkingSlotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ParkingSlotScalarWhereWithAggregatesInput | Prisma.ParkingSlotScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ParkingSlot"> | string;
    block?: Prisma.StringWithAggregatesFilter<"ParkingSlot"> | string;
    number?: Prisma.IntWithAggregatesFilter<"ParkingSlot"> | number;
    floor?: Prisma.IntWithAggregatesFilter<"ParkingSlot"> | number;
    type?: Prisma.EnumSlotTypeWithAggregatesFilter<"ParkingSlot"> | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusWithAggregatesFilter<"ParkingSlot"> | $Enums.SlotStatus;
    xCoord?: Prisma.FloatNullableWithAggregatesFilter<"ParkingSlot"> | number | null;
    yCoord?: Prisma.FloatNullableWithAggregatesFilter<"ParkingSlot"> | number | null;
    nodeId?: Prisma.StringNullableWithAggregatesFilter<"ParkingSlot"> | string | null;
    features?: Prisma.StringNullableListFilter<"ParkingSlot">;
    lotId?: Prisma.StringWithAggregatesFilter<"ParkingSlot"> | string;
};
export type ParkingSlotCreateInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
    lot: Prisma.ParkingLotCreateNestedOneWithoutSlotsInput;
    sessions?: Prisma.ParkingSessionCreateNestedManyWithoutSlotInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutSlotInput;
};
export type ParkingSlotUncheckedCreateInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
    lotId: string;
    sessions?: Prisma.ParkingSessionUncheckedCreateNestedManyWithoutSlotInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutSlotInput;
};
export type ParkingSlotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
    lot?: Prisma.ParkingLotUpdateOneRequiredWithoutSlotsNestedInput;
    sessions?: Prisma.ParkingSessionUpdateManyWithoutSlotNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutSlotNestedInput;
};
export type ParkingSlotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    sessions?: Prisma.ParkingSessionUncheckedUpdateManyWithoutSlotNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutSlotNestedInput;
};
export type ParkingSlotCreateManyInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
    lotId: string;
};
export type ParkingSlotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
};
export type ParkingSlotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ParkingSlotListRelationFilter = {
    every?: Prisma.ParkingSlotWhereInput;
    some?: Prisma.ParkingSlotWhereInput;
    none?: Prisma.ParkingSlotWhereInput;
};
export type ParkingSlotOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type ParkingSlotLotIdBlockNumberFloorCompoundUniqueInput = {
    lotId: string;
    block: string;
    number: number;
    floor: number;
};
export type ParkingSlotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    block?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    xCoord?: Prisma.SortOrder;
    yCoord?: Prisma.SortOrder;
    nodeId?: Prisma.SortOrder;
    features?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
};
export type ParkingSlotAvgOrderByAggregateInput = {
    number?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    xCoord?: Prisma.SortOrder;
    yCoord?: Prisma.SortOrder;
};
export type ParkingSlotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    block?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    xCoord?: Prisma.SortOrder;
    yCoord?: Prisma.SortOrder;
    nodeId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
};
export type ParkingSlotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    block?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    xCoord?: Prisma.SortOrder;
    yCoord?: Prisma.SortOrder;
    nodeId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
};
export type ParkingSlotSumOrderByAggregateInput = {
    number?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    xCoord?: Prisma.SortOrder;
    yCoord?: Prisma.SortOrder;
};
export type ParkingSlotScalarRelationFilter = {
    is?: Prisma.ParkingSlotWhereInput;
    isNot?: Prisma.ParkingSlotWhereInput;
};
export type ParkingSlotNullableScalarRelationFilter = {
    is?: Prisma.ParkingSlotWhereInput | null;
    isNot?: Prisma.ParkingSlotWhereInput | null;
};
export type ParkingSlotCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.ParkingSlotCreateWithoutLotInput, Prisma.ParkingSlotUncheckedCreateWithoutLotInput> | Prisma.ParkingSlotCreateWithoutLotInput[] | Prisma.ParkingSlotUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.ParkingSlotCreateOrConnectWithoutLotInput | Prisma.ParkingSlotCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.ParkingSlotCreateManyLotInputEnvelope;
    connect?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
};
export type ParkingSlotUncheckedCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.ParkingSlotCreateWithoutLotInput, Prisma.ParkingSlotUncheckedCreateWithoutLotInput> | Prisma.ParkingSlotCreateWithoutLotInput[] | Prisma.ParkingSlotUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.ParkingSlotCreateOrConnectWithoutLotInput | Prisma.ParkingSlotCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.ParkingSlotCreateManyLotInputEnvelope;
    connect?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
};
export type ParkingSlotUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSlotCreateWithoutLotInput, Prisma.ParkingSlotUncheckedCreateWithoutLotInput> | Prisma.ParkingSlotCreateWithoutLotInput[] | Prisma.ParkingSlotUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.ParkingSlotCreateOrConnectWithoutLotInput | Prisma.ParkingSlotCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.ParkingSlotUpsertWithWhereUniqueWithoutLotInput | Prisma.ParkingSlotUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.ParkingSlotCreateManyLotInputEnvelope;
    set?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
    disconnect?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
    delete?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
    connect?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
    update?: Prisma.ParkingSlotUpdateWithWhereUniqueWithoutLotInput | Prisma.ParkingSlotUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.ParkingSlotUpdateManyWithWhereWithoutLotInput | Prisma.ParkingSlotUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.ParkingSlotScalarWhereInput | Prisma.ParkingSlotScalarWhereInput[];
};
export type ParkingSlotUncheckedUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSlotCreateWithoutLotInput, Prisma.ParkingSlotUncheckedCreateWithoutLotInput> | Prisma.ParkingSlotCreateWithoutLotInput[] | Prisma.ParkingSlotUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.ParkingSlotCreateOrConnectWithoutLotInput | Prisma.ParkingSlotCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.ParkingSlotUpsertWithWhereUniqueWithoutLotInput | Prisma.ParkingSlotUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.ParkingSlotCreateManyLotInputEnvelope;
    set?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
    disconnect?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
    delete?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
    connect?: Prisma.ParkingSlotWhereUniqueInput | Prisma.ParkingSlotWhereUniqueInput[];
    update?: Prisma.ParkingSlotUpdateWithWhereUniqueWithoutLotInput | Prisma.ParkingSlotUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.ParkingSlotUpdateManyWithWhereWithoutLotInput | Prisma.ParkingSlotUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.ParkingSlotScalarWhereInput | Prisma.ParkingSlotScalarWhereInput[];
};
export type ParkingSlotCreatefeaturesInput = {
    set: string[];
};
export type EnumSlotTypeFieldUpdateOperationsInput = {
    set?: $Enums.SlotType;
};
export type EnumSlotStatusFieldUpdateOperationsInput = {
    set?: $Enums.SlotStatus;
};
export type ParkingSlotUpdatefeaturesInput = {
    set?: string[];
    push?: string | string[];
};
export type ParkingSlotCreateNestedOneWithoutSessionsInput = {
    create?: Prisma.XOR<Prisma.ParkingSlotCreateWithoutSessionsInput, Prisma.ParkingSlotUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.ParkingSlotCreateOrConnectWithoutSessionsInput;
    connect?: Prisma.ParkingSlotWhereUniqueInput;
};
export type ParkingSlotUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSlotCreateWithoutSessionsInput, Prisma.ParkingSlotUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.ParkingSlotCreateOrConnectWithoutSessionsInput;
    upsert?: Prisma.ParkingSlotUpsertWithoutSessionsInput;
    connect?: Prisma.ParkingSlotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ParkingSlotUpdateToOneWithWhereWithoutSessionsInput, Prisma.ParkingSlotUpdateWithoutSessionsInput>, Prisma.ParkingSlotUncheckedUpdateWithoutSessionsInput>;
};
export type ParkingSlotCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.ParkingSlotCreateWithoutBookingsInput, Prisma.ParkingSlotUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ParkingSlotCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.ParkingSlotWhereUniqueInput;
};
export type ParkingSlotUpdateOneWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingSlotCreateWithoutBookingsInput, Prisma.ParkingSlotUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ParkingSlotCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.ParkingSlotUpsertWithoutBookingsInput;
    disconnect?: Prisma.ParkingSlotWhereInput | boolean;
    delete?: Prisma.ParkingSlotWhereInput | boolean;
    connect?: Prisma.ParkingSlotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ParkingSlotUpdateToOneWithWhereWithoutBookingsInput, Prisma.ParkingSlotUpdateWithoutBookingsInput>, Prisma.ParkingSlotUncheckedUpdateWithoutBookingsInput>;
};
export type ParkingSlotCreateWithoutLotInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
    sessions?: Prisma.ParkingSessionCreateNestedManyWithoutSlotInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutSlotInput;
};
export type ParkingSlotUncheckedCreateWithoutLotInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
    sessions?: Prisma.ParkingSessionUncheckedCreateNestedManyWithoutSlotInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutSlotInput;
};
export type ParkingSlotCreateOrConnectWithoutLotInput = {
    where: Prisma.ParkingSlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingSlotCreateWithoutLotInput, Prisma.ParkingSlotUncheckedCreateWithoutLotInput>;
};
export type ParkingSlotCreateManyLotInputEnvelope = {
    data: Prisma.ParkingSlotCreateManyLotInput | Prisma.ParkingSlotCreateManyLotInput[];
    skipDuplicates?: boolean;
};
export type ParkingSlotUpsertWithWhereUniqueWithoutLotInput = {
    where: Prisma.ParkingSlotWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParkingSlotUpdateWithoutLotInput, Prisma.ParkingSlotUncheckedUpdateWithoutLotInput>;
    create: Prisma.XOR<Prisma.ParkingSlotCreateWithoutLotInput, Prisma.ParkingSlotUncheckedCreateWithoutLotInput>;
};
export type ParkingSlotUpdateWithWhereUniqueWithoutLotInput = {
    where: Prisma.ParkingSlotWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParkingSlotUpdateWithoutLotInput, Prisma.ParkingSlotUncheckedUpdateWithoutLotInput>;
};
export type ParkingSlotUpdateManyWithWhereWithoutLotInput = {
    where: Prisma.ParkingSlotScalarWhereInput;
    data: Prisma.XOR<Prisma.ParkingSlotUpdateManyMutationInput, Prisma.ParkingSlotUncheckedUpdateManyWithoutLotInput>;
};
export type ParkingSlotScalarWhereInput = {
    AND?: Prisma.ParkingSlotScalarWhereInput | Prisma.ParkingSlotScalarWhereInput[];
    OR?: Prisma.ParkingSlotScalarWhereInput[];
    NOT?: Prisma.ParkingSlotScalarWhereInput | Prisma.ParkingSlotScalarWhereInput[];
    id?: Prisma.StringFilter<"ParkingSlot"> | string;
    block?: Prisma.StringFilter<"ParkingSlot"> | string;
    number?: Prisma.IntFilter<"ParkingSlot"> | number;
    floor?: Prisma.IntFilter<"ParkingSlot"> | number;
    type?: Prisma.EnumSlotTypeFilter<"ParkingSlot"> | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFilter<"ParkingSlot"> | $Enums.SlotStatus;
    xCoord?: Prisma.FloatNullableFilter<"ParkingSlot"> | number | null;
    yCoord?: Prisma.FloatNullableFilter<"ParkingSlot"> | number | null;
    nodeId?: Prisma.StringNullableFilter<"ParkingSlot"> | string | null;
    features?: Prisma.StringNullableListFilter<"ParkingSlot">;
    lotId?: Prisma.StringFilter<"ParkingSlot"> | string;
};
export type ParkingSlotCreateWithoutSessionsInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
    lot: Prisma.ParkingLotCreateNestedOneWithoutSlotsInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutSlotInput;
};
export type ParkingSlotUncheckedCreateWithoutSessionsInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
    lotId: string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutSlotInput;
};
export type ParkingSlotCreateOrConnectWithoutSessionsInput = {
    where: Prisma.ParkingSlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingSlotCreateWithoutSessionsInput, Prisma.ParkingSlotUncheckedCreateWithoutSessionsInput>;
};
export type ParkingSlotUpsertWithoutSessionsInput = {
    update: Prisma.XOR<Prisma.ParkingSlotUpdateWithoutSessionsInput, Prisma.ParkingSlotUncheckedUpdateWithoutSessionsInput>;
    create: Prisma.XOR<Prisma.ParkingSlotCreateWithoutSessionsInput, Prisma.ParkingSlotUncheckedCreateWithoutSessionsInput>;
    where?: Prisma.ParkingSlotWhereInput;
};
export type ParkingSlotUpdateToOneWithWhereWithoutSessionsInput = {
    where?: Prisma.ParkingSlotWhereInput;
    data: Prisma.XOR<Prisma.ParkingSlotUpdateWithoutSessionsInput, Prisma.ParkingSlotUncheckedUpdateWithoutSessionsInput>;
};
export type ParkingSlotUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
    lot?: Prisma.ParkingLotUpdateOneRequiredWithoutSlotsNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutSlotNestedInput;
};
export type ParkingSlotUncheckedUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutSlotNestedInput;
};
export type ParkingSlotCreateWithoutBookingsInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
    lot: Prisma.ParkingLotCreateNestedOneWithoutSlotsInput;
    sessions?: Prisma.ParkingSessionCreateNestedManyWithoutSlotInput;
};
export type ParkingSlotUncheckedCreateWithoutBookingsInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
    lotId: string;
    sessions?: Prisma.ParkingSessionUncheckedCreateNestedManyWithoutSlotInput;
};
export type ParkingSlotCreateOrConnectWithoutBookingsInput = {
    where: Prisma.ParkingSlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingSlotCreateWithoutBookingsInput, Prisma.ParkingSlotUncheckedCreateWithoutBookingsInput>;
};
export type ParkingSlotUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.ParkingSlotUpdateWithoutBookingsInput, Prisma.ParkingSlotUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.ParkingSlotCreateWithoutBookingsInput, Prisma.ParkingSlotUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.ParkingSlotWhereInput;
};
export type ParkingSlotUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.ParkingSlotWhereInput;
    data: Prisma.XOR<Prisma.ParkingSlotUpdateWithoutBookingsInput, Prisma.ParkingSlotUncheckedUpdateWithoutBookingsInput>;
};
export type ParkingSlotUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
    lot?: Prisma.ParkingLotUpdateOneRequiredWithoutSlotsNestedInput;
    sessions?: Prisma.ParkingSessionUpdateManyWithoutSlotNestedInput;
};
export type ParkingSlotUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    sessions?: Prisma.ParkingSessionUncheckedUpdateManyWithoutSlotNestedInput;
};
export type ParkingSlotCreateManyLotInput = {
    id?: string;
    block: string;
    number: number;
    floor: number;
    type?: $Enums.SlotType;
    status?: $Enums.SlotStatus;
    xCoord?: number | null;
    yCoord?: number | null;
    nodeId?: string | null;
    features?: Prisma.ParkingSlotCreatefeaturesInput | string[];
};
export type ParkingSlotUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
    sessions?: Prisma.ParkingSessionUpdateManyWithoutSlotNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutSlotNestedInput;
};
export type ParkingSlotUncheckedUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
    sessions?: Prisma.ParkingSessionUncheckedUpdateManyWithoutSlotNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutSlotNestedInput;
};
export type ParkingSlotUncheckedUpdateManyWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    block?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumSlotTypeFieldUpdateOperationsInput | $Enums.SlotType;
    status?: Prisma.EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus;
    xCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    yCoord?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    nodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    features?: Prisma.ParkingSlotUpdatefeaturesInput | string[];
};
/**
 * Count Type ParkingSlotCountOutputType
 */
export type ParkingSlotCountOutputType = {
    sessions: number;
    bookings: number;
};
export type ParkingSlotCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sessions?: boolean | ParkingSlotCountOutputTypeCountSessionsArgs;
    bookings?: boolean | ParkingSlotCountOutputTypeCountBookingsArgs;
};
/**
 * ParkingSlotCountOutputType without action
 */
export type ParkingSlotCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSlotCountOutputType
     */
    select?: Prisma.ParkingSlotCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ParkingSlotCountOutputType without action
 */
export type ParkingSlotCountOutputTypeCountSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParkingSessionWhereInput;
};
/**
 * ParkingSlotCountOutputType without action
 */
export type ParkingSlotCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type ParkingSlotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    block?: boolean;
    number?: boolean;
    floor?: boolean;
    type?: boolean;
    status?: boolean;
    xCoord?: boolean;
    yCoord?: boolean;
    nodeId?: boolean;
    features?: boolean;
    lotId?: boolean;
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
    sessions?: boolean | Prisma.ParkingSlot$sessionsArgs<ExtArgs>;
    bookings?: boolean | Prisma.ParkingSlot$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ParkingSlotCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parkingSlot"]>;
export type ParkingSlotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    block?: boolean;
    number?: boolean;
    floor?: boolean;
    type?: boolean;
    status?: boolean;
    xCoord?: boolean;
    yCoord?: boolean;
    nodeId?: boolean;
    features?: boolean;
    lotId?: boolean;
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parkingSlot"]>;
export type ParkingSlotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    block?: boolean;
    number?: boolean;
    floor?: boolean;
    type?: boolean;
    status?: boolean;
    xCoord?: boolean;
    yCoord?: boolean;
    nodeId?: boolean;
    features?: boolean;
    lotId?: boolean;
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parkingSlot"]>;
export type ParkingSlotSelectScalar = {
    id?: boolean;
    block?: boolean;
    number?: boolean;
    floor?: boolean;
    type?: boolean;
    status?: boolean;
    xCoord?: boolean;
    yCoord?: boolean;
    nodeId?: boolean;
    features?: boolean;
    lotId?: boolean;
};
export type ParkingSlotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "block" | "number" | "floor" | "type" | "status" | "xCoord" | "yCoord" | "nodeId" | "features" | "lotId", ExtArgs["result"]["parkingSlot"]>;
export type ParkingSlotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
    sessions?: boolean | Prisma.ParkingSlot$sessionsArgs<ExtArgs>;
    bookings?: boolean | Prisma.ParkingSlot$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ParkingSlotCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ParkingSlotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
};
export type ParkingSlotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
};
export type $ParkingSlotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ParkingSlot";
    objects: {
        lot: Prisma.$ParkingLotPayload<ExtArgs>;
        sessions: Prisma.$ParkingSessionPayload<ExtArgs>[];
        bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        block: string;
        number: number;
        floor: number;
        type: $Enums.SlotType;
        status: $Enums.SlotStatus;
        xCoord: number | null;
        yCoord: number | null;
        nodeId: string | null;
        features: string[];
        lotId: string;
    }, ExtArgs["result"]["parkingSlot"]>;
    composites: {};
};
export type ParkingSlotGetPayload<S extends boolean | null | undefined | ParkingSlotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload, S>;
export type ParkingSlotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ParkingSlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ParkingSlotCountAggregateInputType | true;
};
export interface ParkingSlotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ParkingSlot'];
        meta: {
            name: 'ParkingSlot';
        };
    };
    /**
     * Find zero or one ParkingSlot that matches the filter.
     * @param {ParkingSlotFindUniqueArgs} args - Arguments to find a ParkingSlot
     * @example
     * // Get one ParkingSlot
     * const parkingSlot = await prisma.parkingSlot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParkingSlotFindUniqueArgs>(args: Prisma.SelectSubset<T, ParkingSlotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ParkingSlotClient<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ParkingSlot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParkingSlotFindUniqueOrThrowArgs} args - Arguments to find a ParkingSlot
     * @example
     * // Get one ParkingSlot
     * const parkingSlot = await prisma.parkingSlot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParkingSlotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ParkingSlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParkingSlotClient<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParkingSlot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSlotFindFirstArgs} args - Arguments to find a ParkingSlot
     * @example
     * // Get one ParkingSlot
     * const parkingSlot = await prisma.parkingSlot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParkingSlotFindFirstArgs>(args?: Prisma.SelectSubset<T, ParkingSlotFindFirstArgs<ExtArgs>>): Prisma.Prisma__ParkingSlotClient<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParkingSlot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSlotFindFirstOrThrowArgs} args - Arguments to find a ParkingSlot
     * @example
     * // Get one ParkingSlot
     * const parkingSlot = await prisma.parkingSlot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParkingSlotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ParkingSlotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParkingSlotClient<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ParkingSlots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParkingSlots
     * const parkingSlots = await prisma.parkingSlot.findMany()
     *
     * // Get first 10 ParkingSlots
     * const parkingSlots = await prisma.parkingSlot.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const parkingSlotWithIdOnly = await prisma.parkingSlot.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ParkingSlotFindManyArgs>(args?: Prisma.SelectSubset<T, ParkingSlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ParkingSlot.
     * @param {ParkingSlotCreateArgs} args - Arguments to create a ParkingSlot.
     * @example
     * // Create one ParkingSlot
     * const ParkingSlot = await prisma.parkingSlot.create({
     *   data: {
     *     // ... data to create a ParkingSlot
     *   }
     * })
     *
     */
    create<T extends ParkingSlotCreateArgs>(args: Prisma.SelectSubset<T, ParkingSlotCreateArgs<ExtArgs>>): Prisma.Prisma__ParkingSlotClient<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ParkingSlots.
     * @param {ParkingSlotCreateManyArgs} args - Arguments to create many ParkingSlots.
     * @example
     * // Create many ParkingSlots
     * const parkingSlot = await prisma.parkingSlot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ParkingSlotCreateManyArgs>(args?: Prisma.SelectSubset<T, ParkingSlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ParkingSlots and returns the data saved in the database.
     * @param {ParkingSlotCreateManyAndReturnArgs} args - Arguments to create many ParkingSlots.
     * @example
     * // Create many ParkingSlots
     * const parkingSlot = await prisma.parkingSlot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ParkingSlots and only return the `id`
     * const parkingSlotWithIdOnly = await prisma.parkingSlot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ParkingSlotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ParkingSlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ParkingSlot.
     * @param {ParkingSlotDeleteArgs} args - Arguments to delete one ParkingSlot.
     * @example
     * // Delete one ParkingSlot
     * const ParkingSlot = await prisma.parkingSlot.delete({
     *   where: {
     *     // ... filter to delete one ParkingSlot
     *   }
     * })
     *
     */
    delete<T extends ParkingSlotDeleteArgs>(args: Prisma.SelectSubset<T, ParkingSlotDeleteArgs<ExtArgs>>): Prisma.Prisma__ParkingSlotClient<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ParkingSlot.
     * @param {ParkingSlotUpdateArgs} args - Arguments to update one ParkingSlot.
     * @example
     * // Update one ParkingSlot
     * const parkingSlot = await prisma.parkingSlot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ParkingSlotUpdateArgs>(args: Prisma.SelectSubset<T, ParkingSlotUpdateArgs<ExtArgs>>): Prisma.Prisma__ParkingSlotClient<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ParkingSlots.
     * @param {ParkingSlotDeleteManyArgs} args - Arguments to filter ParkingSlots to delete.
     * @example
     * // Delete a few ParkingSlots
     * const { count } = await prisma.parkingSlot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ParkingSlotDeleteManyArgs>(args?: Prisma.SelectSubset<T, ParkingSlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParkingSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParkingSlots
     * const parkingSlot = await prisma.parkingSlot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ParkingSlotUpdateManyArgs>(args: Prisma.SelectSubset<T, ParkingSlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParkingSlots and returns the data updated in the database.
     * @param {ParkingSlotUpdateManyAndReturnArgs} args - Arguments to update many ParkingSlots.
     * @example
     * // Update many ParkingSlots
     * const parkingSlot = await prisma.parkingSlot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ParkingSlots and only return the `id`
     * const parkingSlotWithIdOnly = await prisma.parkingSlot.updateManyAndReturn({
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
    updateManyAndReturn<T extends ParkingSlotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ParkingSlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ParkingSlot.
     * @param {ParkingSlotUpsertArgs} args - Arguments to update or create a ParkingSlot.
     * @example
     * // Update or create a ParkingSlot
     * const parkingSlot = await prisma.parkingSlot.upsert({
     *   create: {
     *     // ... data to create a ParkingSlot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParkingSlot we want to update
     *   }
     * })
     */
    upsert<T extends ParkingSlotUpsertArgs>(args: Prisma.SelectSubset<T, ParkingSlotUpsertArgs<ExtArgs>>): Prisma.Prisma__ParkingSlotClient<runtime.Types.Result.GetResult<Prisma.$ParkingSlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ParkingSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSlotCountArgs} args - Arguments to filter ParkingSlots to count.
     * @example
     * // Count the number of ParkingSlots
     * const count = await prisma.parkingSlot.count({
     *   where: {
     *     // ... the filter for the ParkingSlots we want to count
     *   }
     * })
    **/
    count<T extends ParkingSlotCountArgs>(args?: Prisma.Subset<T, ParkingSlotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ParkingSlotCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ParkingSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ParkingSlotAggregateArgs>(args: Prisma.Subset<T, ParkingSlotAggregateArgs>): Prisma.PrismaPromise<GetParkingSlotAggregateType<T>>;
    /**
     * Group by ParkingSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSlotGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ParkingSlotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ParkingSlotGroupByArgs['orderBy'];
    } : {
        orderBy?: ParkingSlotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ParkingSlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParkingSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ParkingSlot model
     */
    readonly fields: ParkingSlotFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ParkingSlot.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ParkingSlotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lot<T extends Prisma.ParkingLotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParkingLotDefaultArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sessions<T extends Prisma.ParkingSlot$sessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParkingSlot$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.ParkingSlot$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParkingSlot$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the ParkingSlot model
 */
export interface ParkingSlotFieldRefs {
    readonly id: Prisma.FieldRef<"ParkingSlot", 'String'>;
    readonly block: Prisma.FieldRef<"ParkingSlot", 'String'>;
    readonly number: Prisma.FieldRef<"ParkingSlot", 'Int'>;
    readonly floor: Prisma.FieldRef<"ParkingSlot", 'Int'>;
    readonly type: Prisma.FieldRef<"ParkingSlot", 'SlotType'>;
    readonly status: Prisma.FieldRef<"ParkingSlot", 'SlotStatus'>;
    readonly xCoord: Prisma.FieldRef<"ParkingSlot", 'Float'>;
    readonly yCoord: Prisma.FieldRef<"ParkingSlot", 'Float'>;
    readonly nodeId: Prisma.FieldRef<"ParkingSlot", 'String'>;
    readonly features: Prisma.FieldRef<"ParkingSlot", 'String[]'>;
    readonly lotId: Prisma.FieldRef<"ParkingSlot", 'String'>;
}
/**
 * ParkingSlot findUnique
 */
export type ParkingSlotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingSlot to fetch.
     */
    where: Prisma.ParkingSlotWhereUniqueInput;
};
/**
 * ParkingSlot findUniqueOrThrow
 */
export type ParkingSlotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingSlot to fetch.
     */
    where: Prisma.ParkingSlotWhereUniqueInput;
};
/**
 * ParkingSlot findFirst
 */
export type ParkingSlotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingSlot to fetch.
     */
    where?: Prisma.ParkingSlotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingSlots to fetch.
     */
    orderBy?: Prisma.ParkingSlotOrderByWithRelationInput | Prisma.ParkingSlotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParkingSlots.
     */
    cursor?: Prisma.ParkingSlotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingSlots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingSlots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingSlots.
     */
    distinct?: Prisma.ParkingSlotScalarFieldEnum | Prisma.ParkingSlotScalarFieldEnum[];
};
/**
 * ParkingSlot findFirstOrThrow
 */
export type ParkingSlotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingSlot to fetch.
     */
    where?: Prisma.ParkingSlotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingSlots to fetch.
     */
    orderBy?: Prisma.ParkingSlotOrderByWithRelationInput | Prisma.ParkingSlotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParkingSlots.
     */
    cursor?: Prisma.ParkingSlotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingSlots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingSlots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingSlots.
     */
    distinct?: Prisma.ParkingSlotScalarFieldEnum | Prisma.ParkingSlotScalarFieldEnum[];
};
/**
 * ParkingSlot findMany
 */
export type ParkingSlotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingSlots to fetch.
     */
    where?: Prisma.ParkingSlotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingSlots to fetch.
     */
    orderBy?: Prisma.ParkingSlotOrderByWithRelationInput | Prisma.ParkingSlotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ParkingSlots.
     */
    cursor?: Prisma.ParkingSlotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingSlots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingSlots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingSlots.
     */
    distinct?: Prisma.ParkingSlotScalarFieldEnum | Prisma.ParkingSlotScalarFieldEnum[];
};
/**
 * ParkingSlot create
 */
export type ParkingSlotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a ParkingSlot.
     */
    data: Prisma.XOR<Prisma.ParkingSlotCreateInput, Prisma.ParkingSlotUncheckedCreateInput>;
};
/**
 * ParkingSlot createMany
 */
export type ParkingSlotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParkingSlots.
     */
    data: Prisma.ParkingSlotCreateManyInput | Prisma.ParkingSlotCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ParkingSlot createManyAndReturn
 */
export type ParkingSlotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSlot
     */
    select?: Prisma.ParkingSlotSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSlot
     */
    omit?: Prisma.ParkingSlotOmit<ExtArgs> | null;
    /**
     * The data used to create many ParkingSlots.
     */
    data: Prisma.ParkingSlotCreateManyInput | Prisma.ParkingSlotCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSlotIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ParkingSlot update
 */
export type ParkingSlotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a ParkingSlot.
     */
    data: Prisma.XOR<Prisma.ParkingSlotUpdateInput, Prisma.ParkingSlotUncheckedUpdateInput>;
    /**
     * Choose, which ParkingSlot to update.
     */
    where: Prisma.ParkingSlotWhereUniqueInput;
};
/**
 * ParkingSlot updateMany
 */
export type ParkingSlotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ParkingSlots.
     */
    data: Prisma.XOR<Prisma.ParkingSlotUpdateManyMutationInput, Prisma.ParkingSlotUncheckedUpdateManyInput>;
    /**
     * Filter which ParkingSlots to update
     */
    where?: Prisma.ParkingSlotWhereInput;
    /**
     * Limit how many ParkingSlots to update.
     */
    limit?: number;
};
/**
 * ParkingSlot updateManyAndReturn
 */
export type ParkingSlotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSlot
     */
    select?: Prisma.ParkingSlotSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingSlot
     */
    omit?: Prisma.ParkingSlotOmit<ExtArgs> | null;
    /**
     * The data used to update ParkingSlots.
     */
    data: Prisma.XOR<Prisma.ParkingSlotUpdateManyMutationInput, Prisma.ParkingSlotUncheckedUpdateManyInput>;
    /**
     * Filter which ParkingSlots to update
     */
    where?: Prisma.ParkingSlotWhereInput;
    /**
     * Limit how many ParkingSlots to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingSlotIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ParkingSlot upsert
 */
export type ParkingSlotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the ParkingSlot to update in case it exists.
     */
    where: Prisma.ParkingSlotWhereUniqueInput;
    /**
     * In case the ParkingSlot found by the `where` argument doesn't exist, create a new ParkingSlot with this data.
     */
    create: Prisma.XOR<Prisma.ParkingSlotCreateInput, Prisma.ParkingSlotUncheckedCreateInput>;
    /**
     * In case the ParkingSlot was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ParkingSlotUpdateInput, Prisma.ParkingSlotUncheckedUpdateInput>;
};
/**
 * ParkingSlot delete
 */
export type ParkingSlotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which ParkingSlot to delete.
     */
    where: Prisma.ParkingSlotWhereUniqueInput;
};
/**
 * ParkingSlot deleteMany
 */
export type ParkingSlotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingSlots to delete
     */
    where?: Prisma.ParkingSlotWhereInput;
    /**
     * Limit how many ParkingSlots to delete.
     */
    limit?: number;
};
/**
 * ParkingSlot.sessions
 */
export type ParkingSlot$sessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.ParkingSessionWhereInput;
    orderBy?: Prisma.ParkingSessionOrderByWithRelationInput | Prisma.ParkingSessionOrderByWithRelationInput[];
    cursor?: Prisma.ParkingSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParkingSessionScalarFieldEnum | Prisma.ParkingSessionScalarFieldEnum[];
};
/**
 * ParkingSlot.bookings
 */
export type ParkingSlot$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * ParkingSlot without action
 */
export type ParkingSlotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=ParkingSlot.d.ts.map