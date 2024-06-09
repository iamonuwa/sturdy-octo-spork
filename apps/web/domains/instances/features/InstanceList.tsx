"use client";

import { Separator, Skeleton } from "@machines/ui";

import { Instance } from "../components/Instance";
import { Vm } from "@/models/vm";
import { useSearchContext } from "@/providers/search.provider";
import { useVmInstancesQuery } from "../api/instancesQuery";

export const InstanceList = () => {
  const { isLoading, isError, error } = useVmInstancesQuery();
  const { state } = useSearchContext<Vm>();

  if (isLoading)
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950"
      >
        <div className="p-2 grid gap-1 flex-1">
          <Skeleton className="h-3 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
        <Separator className="my-2 lg:hidden" />
        <div className="p-2 grid gap-1 flex-1">
          <div className="flex items-start gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <div className="flex gap-1">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        </div>
        <Separator className="my-2 lg:hidden" />
        <div className="p-2 grid gap-1 flex-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
        <Separator className="my-2 lg:hidden" />
        <div className="p-2 grid gap-1 flex-1">
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-3 w-8" />
      </div>
    ));

  if (isError) return <p>Error: {error.message}</p>;

  return state.results.map((instance, index) => (
    <Instance key={index} {...instance} />
  ));
};
