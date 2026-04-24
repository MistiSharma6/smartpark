import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ParkingAnalytics
 *
 */
export type ParkingAnalyticsModel = runtime.Types.Result.DefaultSelection<Prisma.$ParkingAnalyticsPayload>;
export type AggregateParkingAnalytics = {
    _count: ParkingAnalyticsCountAggregateOutputType | null;
    _avg: ParkingAnalyticsAvgAggregateOutputType | null;
    _sum: ParkingAnalyticsSumAggregateOutputType | null;
    _min: ParkingAnalyticsMinAggregateOutputType | null;
    _max: ParkingAnalyticsMaxAggregateOutputType | null;
};
export type ParkingAnalyticsAvgAggregateOutputType = {
    occupiedSlots: number | null;
    totalSlots: number | null;
    avgDuration: number | null;
};
export type ParkingAnalyticsSumAggregateOutputType = {
    occupiedSlots: number | null;
    totalSlots: number | null;
    avgDuration: number | null;
};
export type ParkingAnalyticsMinAggregateOutputType = {
    id: string | null;
    lotId: string | null;
    timestamp: Date | null;
    occupiedSlots: number | null;
    totalSlots: number | null;
    avgDuration: number | null;
};
export type ParkingAnalyticsMaxAggregateOutputType = {
    id: string | null;
    lotId: string | null;
    timestamp: Date | null;
    occupiedSlots: number | null;
    totalSlots: number | null;
    avgDuration: number | null;
};
export type ParkingAnalyticsCountAggregateOutputType = {
    id: number;
    lotId: number;
    timestamp: number;
    occupiedSlots: number;
    totalSlots: number;
    avgDuration: number;
    _all: number;
};
export type ParkingAnalyticsAvgAggregateInputType = {
    occupiedSlots?: true;
    totalSlots?: true;
    avgDuration?: true;
};
export type ParkingAnalyticsSumAggregateInputType = {
    occupiedSlots?: true;
    totalSlots?: true;
    avgDuration?: true;
};
export type ParkingAnalyticsMinAggregateInputType = {
    id?: true;
    lotId?: true;
    timestamp?: true;
    occupiedSlots?: true;
    totalSlots?: true;
    avgDuration?: true;
};
export type ParkingAnalyticsMaxAggregateInputType = {
    id?: true;
    lotId?: true;
    timestamp?: true;
    occupiedSlots?: true;
    totalSlots?: true;
    avgDuration?: true;
};
export type ParkingAnalyticsCountAggregateInputType = {
    id?: true;
    lotId?: true;
    timestamp?: true;
    occupiedSlots?: true;
    totalSlots?: true;
    avgDuration?: true;
    _all?: true;
};
export type ParkingAnalyticsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingAnalytics to aggregate.
     */
    where?: Prisma.ParkingAnalyticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingAnalytics to fetch.
     */
    orderBy?: Prisma.ParkingAnalyticsOrderByWithRelationInput | Prisma.ParkingAnalyticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ParkingAnalyticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingAnalytics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingAnalytics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ParkingAnalytics
    **/
    _count?: true | ParkingAnalyticsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ParkingAnalyticsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ParkingAnalyticsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ParkingAnalyticsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ParkingAnalyticsMaxAggregateInputType;
};
export type GetParkingAnalyticsAggregateType<T extends ParkingAnalyticsAggregateArgs> = {
    [P in keyof T & keyof AggregateParkingAnalytics]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateParkingAnalytics[P]> : Prisma.GetScalarType<T[P], AggregateParkingAnalytics[P]>;
};
export type ParkingAnalyticsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParkingAnalyticsWhereInput;
    orderBy?: Prisma.ParkingAnalyticsOrderByWithAggregationInput | Prisma.ParkingAnalyticsOrderByWithAggregationInput[];
    by: Prisma.ParkingAnalyticsScalarFieldEnum[] | Prisma.ParkingAnalyticsScalarFieldEnum;
    having?: Prisma.ParkingAnalyticsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ParkingAnalyticsCountAggregateInputType | true;
    _avg?: ParkingAnalyticsAvgAggregateInputType;
    _sum?: ParkingAnalyticsSumAggregateInputType;
    _min?: ParkingAnalyticsMinAggregateInputType;
    _max?: ParkingAnalyticsMaxAggregateInputType;
};
export type ParkingAnalyticsGroupByOutputType = {
    id: string;
    lotId: string;
    timestamp: Date;
    occupiedSlots: number;
    totalSlots: number;
    avgDuration: number | null;
    _count: ParkingAnalyticsCountAggregateOutputType | null;
    _avg: ParkingAnalyticsAvgAggregateOutputType | null;
    _sum: ParkingAnalyticsSumAggregateOutputType | null;
    _min: ParkingAnalyticsMinAggregateOutputType | null;
    _max: ParkingAnalyticsMaxAggregateOutputType | null;
};
export type GetParkingAnalyticsGroupByPayload<T extends ParkingAnalyticsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ParkingAnalyticsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ParkingAnalyticsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ParkingAnalyticsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ParkingAnalyticsGroupByOutputType[P]>;
}>>;
export type ParkingAnalyticsWhereInput = {
    AND?: Prisma.ParkingAnalyticsWhereInput | Prisma.ParkingAnalyticsWhereInput[];
    OR?: Prisma.ParkingAnalyticsWhereInput[];
    NOT?: Prisma.ParkingAnalyticsWhereInput | Prisma.ParkingAnalyticsWhereInput[];
    id?: Prisma.StringFilter<"ParkingAnalytics"> | string;
    lotId?: Prisma.StringFilter<"ParkingAnalytics"> | string;
    timestamp?: Prisma.DateTimeFilter<"ParkingAnalytics"> | Date | string;
    occupiedSlots?: Prisma.IntFilter<"ParkingAnalytics"> | number;
    totalSlots?: Prisma.IntFilter<"ParkingAnalytics"> | number;
    avgDuration?: Prisma.FloatNullableFilter<"ParkingAnalytics"> | number | null;
    lot?: Prisma.XOR<Prisma.ParkingLotScalarRelationFilter, Prisma.ParkingLotWhereInput>;
};
export type ParkingAnalyticsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    occupiedSlots?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    avgDuration?: Prisma.SortOrderInput | Prisma.SortOrder;
    lot?: Prisma.ParkingLotOrderByWithRelationInput;
};
export type ParkingAnalyticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ParkingAnalyticsWhereInput | Prisma.ParkingAnalyticsWhereInput[];
    OR?: Prisma.ParkingAnalyticsWhereInput[];
    NOT?: Prisma.ParkingAnalyticsWhereInput | Prisma.ParkingAnalyticsWhereInput[];
    lotId?: Prisma.StringFilter<"ParkingAnalytics"> | string;
    timestamp?: Prisma.DateTimeFilter<"ParkingAnalytics"> | Date | string;
    occupiedSlots?: Prisma.IntFilter<"ParkingAnalytics"> | number;
    totalSlots?: Prisma.IntFilter<"ParkingAnalytics"> | number;
    avgDuration?: Prisma.FloatNullableFilter<"ParkingAnalytics"> | number | null;
    lot?: Prisma.XOR<Prisma.ParkingLotScalarRelationFilter, Prisma.ParkingLotWhereInput>;
}, "id">;
export type ParkingAnalyticsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    occupiedSlots?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    avgDuration?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ParkingAnalyticsCountOrderByAggregateInput;
    _avg?: Prisma.ParkingAnalyticsAvgOrderByAggregateInput;
    _max?: Prisma.ParkingAnalyticsMaxOrderByAggregateInput;
    _min?: Prisma.ParkingAnalyticsMinOrderByAggregateInput;
    _sum?: Prisma.ParkingAnalyticsSumOrderByAggregateInput;
};
export type ParkingAnalyticsScalarWhereWithAggregatesInput = {
    AND?: Prisma.ParkingAnalyticsScalarWhereWithAggregatesInput | Prisma.ParkingAnalyticsScalarWhereWithAggregatesInput[];
    OR?: Prisma.ParkingAnalyticsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ParkingAnalyticsScalarWhereWithAggregatesInput | Prisma.ParkingAnalyticsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ParkingAnalytics"> | string;
    lotId?: Prisma.StringWithAggregatesFilter<"ParkingAnalytics"> | string;
    timestamp?: Prisma.DateTimeWithAggregatesFilter<"ParkingAnalytics"> | Date | string;
    occupiedSlots?: Prisma.IntWithAggregatesFilter<"ParkingAnalytics"> | number;
    totalSlots?: Prisma.IntWithAggregatesFilter<"ParkingAnalytics"> | number;
    avgDuration?: Prisma.FloatNullableWithAggregatesFilter<"ParkingAnalytics"> | number | null;
};
export type ParkingAnalyticsCreateInput = {
    id?: string;
    timestamp?: Date | string;
    occupiedSlots: number;
    totalSlots: number;
    avgDuration?: number | null;
    lot: Prisma.ParkingLotCreateNestedOneWithoutAnalyticsInput;
};
export type ParkingAnalyticsUncheckedCreateInput = {
    id?: string;
    lotId: string;
    timestamp?: Date | string;
    occupiedSlots: number;
    totalSlots: number;
    avgDuration?: number | null;
};
export type ParkingAnalyticsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occupiedSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    avgDuration?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lot?: Prisma.ParkingLotUpdateOneRequiredWithoutAnalyticsNestedInput;
};
export type ParkingAnalyticsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occupiedSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    avgDuration?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type ParkingAnalyticsCreateManyInput = {
    id?: string;
    lotId: string;
    timestamp?: Date | string;
    occupiedSlots: number;
    totalSlots: number;
    avgDuration?: number | null;
};
export type ParkingAnalyticsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occupiedSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    avgDuration?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type ParkingAnalyticsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occupiedSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    avgDuration?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type ParkingAnalyticsListRelationFilter = {
    every?: Prisma.ParkingAnalyticsWhereInput;
    some?: Prisma.ParkingAnalyticsWhereInput;
    none?: Prisma.ParkingAnalyticsWhereInput;
};
export type ParkingAnalyticsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ParkingAnalyticsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    occupiedSlots?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    avgDuration?: Prisma.SortOrder;
};
export type ParkingAnalyticsAvgOrderByAggregateInput = {
    occupiedSlots?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    avgDuration?: Prisma.SortOrder;
};
export type ParkingAnalyticsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    occupiedSlots?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    avgDuration?: Prisma.SortOrder;
};
export type ParkingAnalyticsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    occupiedSlots?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    avgDuration?: Prisma.SortOrder;
};
export type ParkingAnalyticsSumOrderByAggregateInput = {
    occupiedSlots?: Prisma.SortOrder;
    totalSlots?: Prisma.SortOrder;
    avgDuration?: Prisma.SortOrder;
};
export type ParkingAnalyticsCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.ParkingAnalyticsCreateWithoutLotInput, Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput> | Prisma.ParkingAnalyticsCreateWithoutLotInput[] | Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.ParkingAnalyticsCreateOrConnectWithoutLotInput | Prisma.ParkingAnalyticsCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.ParkingAnalyticsCreateManyLotInputEnvelope;
    connect?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
};
export type ParkingAnalyticsUncheckedCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.ParkingAnalyticsCreateWithoutLotInput, Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput> | Prisma.ParkingAnalyticsCreateWithoutLotInput[] | Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.ParkingAnalyticsCreateOrConnectWithoutLotInput | Prisma.ParkingAnalyticsCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.ParkingAnalyticsCreateManyLotInputEnvelope;
    connect?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
};
export type ParkingAnalyticsUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingAnalyticsCreateWithoutLotInput, Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput> | Prisma.ParkingAnalyticsCreateWithoutLotInput[] | Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.ParkingAnalyticsCreateOrConnectWithoutLotInput | Prisma.ParkingAnalyticsCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.ParkingAnalyticsUpsertWithWhereUniqueWithoutLotInput | Prisma.ParkingAnalyticsUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.ParkingAnalyticsCreateManyLotInputEnvelope;
    set?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
    disconnect?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
    delete?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
    connect?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
    update?: Prisma.ParkingAnalyticsUpdateWithWhereUniqueWithoutLotInput | Prisma.ParkingAnalyticsUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.ParkingAnalyticsUpdateManyWithWhereWithoutLotInput | Prisma.ParkingAnalyticsUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.ParkingAnalyticsScalarWhereInput | Prisma.ParkingAnalyticsScalarWhereInput[];
};
export type ParkingAnalyticsUncheckedUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.ParkingAnalyticsCreateWithoutLotInput, Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput> | Prisma.ParkingAnalyticsCreateWithoutLotInput[] | Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.ParkingAnalyticsCreateOrConnectWithoutLotInput | Prisma.ParkingAnalyticsCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.ParkingAnalyticsUpsertWithWhereUniqueWithoutLotInput | Prisma.ParkingAnalyticsUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.ParkingAnalyticsCreateManyLotInputEnvelope;
    set?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
    disconnect?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
    delete?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
    connect?: Prisma.ParkingAnalyticsWhereUniqueInput | Prisma.ParkingAnalyticsWhereUniqueInput[];
    update?: Prisma.ParkingAnalyticsUpdateWithWhereUniqueWithoutLotInput | Prisma.ParkingAnalyticsUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.ParkingAnalyticsUpdateManyWithWhereWithoutLotInput | Prisma.ParkingAnalyticsUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.ParkingAnalyticsScalarWhereInput | Prisma.ParkingAnalyticsScalarWhereInput[];
};
export type ParkingAnalyticsCreateWithoutLotInput = {
    id?: string;
    timestamp?: Date | string;
    occupiedSlots: number;
    totalSlots: number;
    avgDuration?: number | null;
};
export type ParkingAnalyticsUncheckedCreateWithoutLotInput = {
    id?: string;
    timestamp?: Date | string;
    occupiedSlots: number;
    totalSlots: number;
    avgDuration?: number | null;
};
export type ParkingAnalyticsCreateOrConnectWithoutLotInput = {
    where: Prisma.ParkingAnalyticsWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParkingAnalyticsCreateWithoutLotInput, Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput>;
};
export type ParkingAnalyticsCreateManyLotInputEnvelope = {
    data: Prisma.ParkingAnalyticsCreateManyLotInput | Prisma.ParkingAnalyticsCreateManyLotInput[];
    skipDuplicates?: boolean;
};
export type ParkingAnalyticsUpsertWithWhereUniqueWithoutLotInput = {
    where: Prisma.ParkingAnalyticsWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParkingAnalyticsUpdateWithoutLotInput, Prisma.ParkingAnalyticsUncheckedUpdateWithoutLotInput>;
    create: Prisma.XOR<Prisma.ParkingAnalyticsCreateWithoutLotInput, Prisma.ParkingAnalyticsUncheckedCreateWithoutLotInput>;
};
export type ParkingAnalyticsUpdateWithWhereUniqueWithoutLotInput = {
    where: Prisma.ParkingAnalyticsWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParkingAnalyticsUpdateWithoutLotInput, Prisma.ParkingAnalyticsUncheckedUpdateWithoutLotInput>;
};
export type ParkingAnalyticsUpdateManyWithWhereWithoutLotInput = {
    where: Prisma.ParkingAnalyticsScalarWhereInput;
    data: Prisma.XOR<Prisma.ParkingAnalyticsUpdateManyMutationInput, Prisma.ParkingAnalyticsUncheckedUpdateManyWithoutLotInput>;
};
export type ParkingAnalyticsScalarWhereInput = {
    AND?: Prisma.ParkingAnalyticsScalarWhereInput | Prisma.ParkingAnalyticsScalarWhereInput[];
    OR?: Prisma.ParkingAnalyticsScalarWhereInput[];
    NOT?: Prisma.ParkingAnalyticsScalarWhereInput | Prisma.ParkingAnalyticsScalarWhereInput[];
    id?: Prisma.StringFilter<"ParkingAnalytics"> | string;
    lotId?: Prisma.StringFilter<"ParkingAnalytics"> | string;
    timestamp?: Prisma.DateTimeFilter<"ParkingAnalytics"> | Date | string;
    occupiedSlots?: Prisma.IntFilter<"ParkingAnalytics"> | number;
    totalSlots?: Prisma.IntFilter<"ParkingAnalytics"> | number;
    avgDuration?: Prisma.FloatNullableFilter<"ParkingAnalytics"> | number | null;
};
export type ParkingAnalyticsCreateManyLotInput = {
    id?: string;
    timestamp?: Date | string;
    occupiedSlots: number;
    totalSlots: number;
    avgDuration?: number | null;
};
export type ParkingAnalyticsUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occupiedSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    avgDuration?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type ParkingAnalyticsUncheckedUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occupiedSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    avgDuration?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type ParkingAnalyticsUncheckedUpdateManyWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occupiedSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSlots?: Prisma.IntFieldUpdateOperationsInput | number;
    avgDuration?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type ParkingAnalyticsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lotId?: boolean;
    timestamp?: boolean;
    occupiedSlots?: boolean;
    totalSlots?: boolean;
    avgDuration?: boolean;
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parkingAnalytics"]>;
export type ParkingAnalyticsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lotId?: boolean;
    timestamp?: boolean;
    occupiedSlots?: boolean;
    totalSlots?: boolean;
    avgDuration?: boolean;
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parkingAnalytics"]>;
export type ParkingAnalyticsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lotId?: boolean;
    timestamp?: boolean;
    occupiedSlots?: boolean;
    totalSlots?: boolean;
    avgDuration?: boolean;
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parkingAnalytics"]>;
export type ParkingAnalyticsSelectScalar = {
    id?: boolean;
    lotId?: boolean;
    timestamp?: boolean;
    occupiedSlots?: boolean;
    totalSlots?: boolean;
    avgDuration?: boolean;
};
export type ParkingAnalyticsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "lotId" | "timestamp" | "occupiedSlots" | "totalSlots" | "avgDuration", ExtArgs["result"]["parkingAnalytics"]>;
export type ParkingAnalyticsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
};
export type ParkingAnalyticsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
};
export type ParkingAnalyticsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.ParkingLotDefaultArgs<ExtArgs>;
};
export type $ParkingAnalyticsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ParkingAnalytics";
    objects: {
        lot: Prisma.$ParkingLotPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        lotId: string;
        timestamp: Date;
        occupiedSlots: number;
        totalSlots: number;
        avgDuration: number | null;
    }, ExtArgs["result"]["parkingAnalytics"]>;
    composites: {};
};
export type ParkingAnalyticsGetPayload<S extends boolean | null | undefined | ParkingAnalyticsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload, S>;
export type ParkingAnalyticsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ParkingAnalyticsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ParkingAnalyticsCountAggregateInputType | true;
};
export interface ParkingAnalyticsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ParkingAnalytics'];
        meta: {
            name: 'ParkingAnalytics';
        };
    };
    /**
     * Find zero or one ParkingAnalytics that matches the filter.
     * @param {ParkingAnalyticsFindUniqueArgs} args - Arguments to find a ParkingAnalytics
     * @example
     * // Get one ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParkingAnalyticsFindUniqueArgs>(args: Prisma.SelectSubset<T, ParkingAnalyticsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ParkingAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ParkingAnalytics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParkingAnalyticsFindUniqueOrThrowArgs} args - Arguments to find a ParkingAnalytics
     * @example
     * // Get one ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParkingAnalyticsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ParkingAnalyticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParkingAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParkingAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingAnalyticsFindFirstArgs} args - Arguments to find a ParkingAnalytics
     * @example
     * // Get one ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParkingAnalyticsFindFirstArgs>(args?: Prisma.SelectSubset<T, ParkingAnalyticsFindFirstArgs<ExtArgs>>): Prisma.Prisma__ParkingAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParkingAnalytics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingAnalyticsFindFirstOrThrowArgs} args - Arguments to find a ParkingAnalytics
     * @example
     * // Get one ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParkingAnalyticsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ParkingAnalyticsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParkingAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ParkingAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingAnalyticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.findMany()
     *
     * // Get first 10 ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const parkingAnalyticsWithIdOnly = await prisma.parkingAnalytics.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ParkingAnalyticsFindManyArgs>(args?: Prisma.SelectSubset<T, ParkingAnalyticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ParkingAnalytics.
     * @param {ParkingAnalyticsCreateArgs} args - Arguments to create a ParkingAnalytics.
     * @example
     * // Create one ParkingAnalytics
     * const ParkingAnalytics = await prisma.parkingAnalytics.create({
     *   data: {
     *     // ... data to create a ParkingAnalytics
     *   }
     * })
     *
     */
    create<T extends ParkingAnalyticsCreateArgs>(args: Prisma.SelectSubset<T, ParkingAnalyticsCreateArgs<ExtArgs>>): Prisma.Prisma__ParkingAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ParkingAnalytics.
     * @param {ParkingAnalyticsCreateManyArgs} args - Arguments to create many ParkingAnalytics.
     * @example
     * // Create many ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ParkingAnalyticsCreateManyArgs>(args?: Prisma.SelectSubset<T, ParkingAnalyticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ParkingAnalytics and returns the data saved in the database.
     * @param {ParkingAnalyticsCreateManyAndReturnArgs} args - Arguments to create many ParkingAnalytics.
     * @example
     * // Create many ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ParkingAnalytics and only return the `id`
     * const parkingAnalyticsWithIdOnly = await prisma.parkingAnalytics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ParkingAnalyticsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ParkingAnalyticsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ParkingAnalytics.
     * @param {ParkingAnalyticsDeleteArgs} args - Arguments to delete one ParkingAnalytics.
     * @example
     * // Delete one ParkingAnalytics
     * const ParkingAnalytics = await prisma.parkingAnalytics.delete({
     *   where: {
     *     // ... filter to delete one ParkingAnalytics
     *   }
     * })
     *
     */
    delete<T extends ParkingAnalyticsDeleteArgs>(args: Prisma.SelectSubset<T, ParkingAnalyticsDeleteArgs<ExtArgs>>): Prisma.Prisma__ParkingAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ParkingAnalytics.
     * @param {ParkingAnalyticsUpdateArgs} args - Arguments to update one ParkingAnalytics.
     * @example
     * // Update one ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ParkingAnalyticsUpdateArgs>(args: Prisma.SelectSubset<T, ParkingAnalyticsUpdateArgs<ExtArgs>>): Prisma.Prisma__ParkingAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ParkingAnalytics.
     * @param {ParkingAnalyticsDeleteManyArgs} args - Arguments to filter ParkingAnalytics to delete.
     * @example
     * // Delete a few ParkingAnalytics
     * const { count } = await prisma.parkingAnalytics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ParkingAnalyticsDeleteManyArgs>(args?: Prisma.SelectSubset<T, ParkingAnalyticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParkingAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingAnalyticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ParkingAnalyticsUpdateManyArgs>(args: Prisma.SelectSubset<T, ParkingAnalyticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParkingAnalytics and returns the data updated in the database.
     * @param {ParkingAnalyticsUpdateManyAndReturnArgs} args - Arguments to update many ParkingAnalytics.
     * @example
     * // Update many ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ParkingAnalytics and only return the `id`
     * const parkingAnalyticsWithIdOnly = await prisma.parkingAnalytics.updateManyAndReturn({
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
    updateManyAndReturn<T extends ParkingAnalyticsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ParkingAnalyticsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ParkingAnalytics.
     * @param {ParkingAnalyticsUpsertArgs} args - Arguments to update or create a ParkingAnalytics.
     * @example
     * // Update or create a ParkingAnalytics
     * const parkingAnalytics = await prisma.parkingAnalytics.upsert({
     *   create: {
     *     // ... data to create a ParkingAnalytics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParkingAnalytics we want to update
     *   }
     * })
     */
    upsert<T extends ParkingAnalyticsUpsertArgs>(args: Prisma.SelectSubset<T, ParkingAnalyticsUpsertArgs<ExtArgs>>): Prisma.Prisma__ParkingAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$ParkingAnalyticsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ParkingAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingAnalyticsCountArgs} args - Arguments to filter ParkingAnalytics to count.
     * @example
     * // Count the number of ParkingAnalytics
     * const count = await prisma.parkingAnalytics.count({
     *   where: {
     *     // ... the filter for the ParkingAnalytics we want to count
     *   }
     * })
    **/
    count<T extends ParkingAnalyticsCountArgs>(args?: Prisma.Subset<T, ParkingAnalyticsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ParkingAnalyticsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ParkingAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingAnalyticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ParkingAnalyticsAggregateArgs>(args: Prisma.Subset<T, ParkingAnalyticsAggregateArgs>): Prisma.PrismaPromise<GetParkingAnalyticsAggregateType<T>>;
    /**
     * Group by ParkingAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingAnalyticsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ParkingAnalyticsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ParkingAnalyticsGroupByArgs['orderBy'];
    } : {
        orderBy?: ParkingAnalyticsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ParkingAnalyticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParkingAnalyticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ParkingAnalytics model
     */
    readonly fields: ParkingAnalyticsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ParkingAnalytics.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ParkingAnalyticsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lot<T extends Prisma.ParkingLotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParkingLotDefaultArgs<ExtArgs>>): Prisma.Prisma__ParkingLotClient<runtime.Types.Result.GetResult<Prisma.$ParkingLotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ParkingAnalytics model
 */
export interface ParkingAnalyticsFieldRefs {
    readonly id: Prisma.FieldRef<"ParkingAnalytics", 'String'>;
    readonly lotId: Prisma.FieldRef<"ParkingAnalytics", 'String'>;
    readonly timestamp: Prisma.FieldRef<"ParkingAnalytics", 'DateTime'>;
    readonly occupiedSlots: Prisma.FieldRef<"ParkingAnalytics", 'Int'>;
    readonly totalSlots: Prisma.FieldRef<"ParkingAnalytics", 'Int'>;
    readonly avgDuration: Prisma.FieldRef<"ParkingAnalytics", 'Float'>;
}
/**
 * ParkingAnalytics findUnique
 */
export type ParkingAnalyticsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingAnalytics to fetch.
     */
    where: Prisma.ParkingAnalyticsWhereUniqueInput;
};
/**
 * ParkingAnalytics findUniqueOrThrow
 */
export type ParkingAnalyticsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingAnalytics to fetch.
     */
    where: Prisma.ParkingAnalyticsWhereUniqueInput;
};
/**
 * ParkingAnalytics findFirst
 */
export type ParkingAnalyticsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingAnalytics to fetch.
     */
    where?: Prisma.ParkingAnalyticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingAnalytics to fetch.
     */
    orderBy?: Prisma.ParkingAnalyticsOrderByWithRelationInput | Prisma.ParkingAnalyticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParkingAnalytics.
     */
    cursor?: Prisma.ParkingAnalyticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingAnalytics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingAnalytics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingAnalytics.
     */
    distinct?: Prisma.ParkingAnalyticsScalarFieldEnum | Prisma.ParkingAnalyticsScalarFieldEnum[];
};
/**
 * ParkingAnalytics findFirstOrThrow
 */
export type ParkingAnalyticsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingAnalytics to fetch.
     */
    where?: Prisma.ParkingAnalyticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingAnalytics to fetch.
     */
    orderBy?: Prisma.ParkingAnalyticsOrderByWithRelationInput | Prisma.ParkingAnalyticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParkingAnalytics.
     */
    cursor?: Prisma.ParkingAnalyticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingAnalytics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingAnalytics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingAnalytics.
     */
    distinct?: Prisma.ParkingAnalyticsScalarFieldEnum | Prisma.ParkingAnalyticsScalarFieldEnum[];
};
/**
 * ParkingAnalytics findMany
 */
export type ParkingAnalyticsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParkingAnalytics to fetch.
     */
    where?: Prisma.ParkingAnalyticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParkingAnalytics to fetch.
     */
    orderBy?: Prisma.ParkingAnalyticsOrderByWithRelationInput | Prisma.ParkingAnalyticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ParkingAnalytics.
     */
    cursor?: Prisma.ParkingAnalyticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParkingAnalytics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParkingAnalytics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParkingAnalytics.
     */
    distinct?: Prisma.ParkingAnalyticsScalarFieldEnum | Prisma.ParkingAnalyticsScalarFieldEnum[];
};
/**
 * ParkingAnalytics create
 */
export type ParkingAnalyticsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a ParkingAnalytics.
     */
    data: Prisma.XOR<Prisma.ParkingAnalyticsCreateInput, Prisma.ParkingAnalyticsUncheckedCreateInput>;
};
/**
 * ParkingAnalytics createMany
 */
export type ParkingAnalyticsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParkingAnalytics.
     */
    data: Prisma.ParkingAnalyticsCreateManyInput | Prisma.ParkingAnalyticsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ParkingAnalytics createManyAndReturn
 */
export type ParkingAnalyticsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingAnalytics
     */
    select?: Prisma.ParkingAnalyticsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingAnalytics
     */
    omit?: Prisma.ParkingAnalyticsOmit<ExtArgs> | null;
    /**
     * The data used to create many ParkingAnalytics.
     */
    data: Prisma.ParkingAnalyticsCreateManyInput | Prisma.ParkingAnalyticsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingAnalyticsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ParkingAnalytics update
 */
export type ParkingAnalyticsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a ParkingAnalytics.
     */
    data: Prisma.XOR<Prisma.ParkingAnalyticsUpdateInput, Prisma.ParkingAnalyticsUncheckedUpdateInput>;
    /**
     * Choose, which ParkingAnalytics to update.
     */
    where: Prisma.ParkingAnalyticsWhereUniqueInput;
};
/**
 * ParkingAnalytics updateMany
 */
export type ParkingAnalyticsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ParkingAnalytics.
     */
    data: Prisma.XOR<Prisma.ParkingAnalyticsUpdateManyMutationInput, Prisma.ParkingAnalyticsUncheckedUpdateManyInput>;
    /**
     * Filter which ParkingAnalytics to update
     */
    where?: Prisma.ParkingAnalyticsWhereInput;
    /**
     * Limit how many ParkingAnalytics to update.
     */
    limit?: number;
};
/**
 * ParkingAnalytics updateManyAndReturn
 */
export type ParkingAnalyticsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingAnalytics
     */
    select?: Prisma.ParkingAnalyticsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParkingAnalytics
     */
    omit?: Prisma.ParkingAnalyticsOmit<ExtArgs> | null;
    /**
     * The data used to update ParkingAnalytics.
     */
    data: Prisma.XOR<Prisma.ParkingAnalyticsUpdateManyMutationInput, Prisma.ParkingAnalyticsUncheckedUpdateManyInput>;
    /**
     * Filter which ParkingAnalytics to update
     */
    where?: Prisma.ParkingAnalyticsWhereInput;
    /**
     * Limit how many ParkingAnalytics to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParkingAnalyticsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ParkingAnalytics upsert
 */
export type ParkingAnalyticsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the ParkingAnalytics to update in case it exists.
     */
    where: Prisma.ParkingAnalyticsWhereUniqueInput;
    /**
     * In case the ParkingAnalytics found by the `where` argument doesn't exist, create a new ParkingAnalytics with this data.
     */
    create: Prisma.XOR<Prisma.ParkingAnalyticsCreateInput, Prisma.ParkingAnalyticsUncheckedCreateInput>;
    /**
     * In case the ParkingAnalytics was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ParkingAnalyticsUpdateInput, Prisma.ParkingAnalyticsUncheckedUpdateInput>;
};
/**
 * ParkingAnalytics delete
 */
export type ParkingAnalyticsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which ParkingAnalytics to delete.
     */
    where: Prisma.ParkingAnalyticsWhereUniqueInput;
};
/**
 * ParkingAnalytics deleteMany
 */
export type ParkingAnalyticsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingAnalytics to delete
     */
    where?: Prisma.ParkingAnalyticsWhereInput;
    /**
     * Limit how many ParkingAnalytics to delete.
     */
    limit?: number;
};
/**
 * ParkingAnalytics without action
 */
export type ParkingAnalyticsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=ParkingAnalytics.d.ts.map