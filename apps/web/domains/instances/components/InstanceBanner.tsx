import { Button, Skeleton } from "@machines/ui";

import React from "react";
import { cn } from "@machines/ui/cn";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import { useUpdateInstanceMutation } from "../api/updateInstanceMutation";
import { useVmInstanceQuery } from "../api/instanceQuery";

export const InstanceBanner = () => {
  const { data, isLoading, isError, error } = useVmInstanceQuery();
  const { mutateAsync: updateInstance } = useUpdateInstanceMutation();
  const { address } = useAccount();

  if (isLoading)
    return (
      <header>
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-x-3">
              <Skeleton className="h-2 w-6" />
              <Skeleton className="h-2 w-6" />
            </div>
            <Skeleton className="h-2 w-6" />
          </div>
          <Skeleton className="h-4 w-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className={cn("border border-primary/5 px-4 py-6 sm:px-6 lg:px-8")}
          >
            <span className="text-sm font-medium leading-6 text-gray-400">
              CPU Usage
            </span>
            <Skeleton className="h-2 w-6" />
          </div>
          <div
            className={cn("border border-primary/5 px-4 py-6 sm:px-6 lg:px-8")}
          >
            <span className="text-sm font-medium leading-6 text-gray-400">
              Memory
            </span>
            <Skeleton className="h-2 w-6" />
          </div>
          <div
            className={cn("border border-primary/5 px-4 py-6 sm:px-6 lg:px-8")}
          >
            <span className="text-sm font-medium leading-6 text-gray-400">
              Disk
            </span>
            <Skeleton className="h-2 w-6" />
          </div>
          <div
            className={cn("border border-primary/5 px-4 py-6 sm:px-6 lg:px-8")}
          >
            <span className="text-sm font-medium leading-6 text-gray-400">
              Region
            </span>
            <Skeleton className="h-2 w-6" />
          </div>
        </div>
      </header>
    );
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <header>
      <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-x-3">
            <span className="relative flex h-3 w-3">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75",
                  {
                    "bg-green-400 animate-ping": data?.status === "RUNNING",
                  }
                )}
              />
              <span
                className={cn("relative inline-flex rounded-full h-3 w-3", {
                  "bg-green-400": data?.status === "RUNNING",
                  "bg-red-400": data?.status === "TERMINATED",
                })}
              />
            </span>
            <h1 className="flex gap-x-3 text-base leading-7">
              <span className="font-semibold text-primary">{data?.name}</span>
            </h1>
          </div>
          <p className="mt-2 text-xs leading-6 text-gray-400">
            Deploys from GitHub via main branch
          </p>
        </div>
        {(data || !isLoading) &&
        // manually check if the user is the creator of the instance
        // in a real-world scenario, this should be done on the server
        isAddress(data?.from.identifier as `0x${string}`) &&
        data?.from.identifier === address ? (
          <Button
            variant="outline"
            onClick={() => {
              updateInstance({
                id: data?.id,
                status: data?.status === "RUNNING" ? "TERMINATED" : "RUNNING",
              });
            }}
          >
            {data?.status === "RUNNING" ? "Stop Instance" : "Restart Instance"}
          </Button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className={cn("border border-primary/5 px-4 py-6 sm:px-6 lg:px-8")}
        >
          <span className="text-sm font-medium leading-6 text-gray-400">
            CPU Usage
          </span>
          <span className="mt-2 flex items-baseline gap-x-2">
            <span className="text-xl font-semibold tracking-tight text-primary">
              {data?.cpu}
            </span>
          </span>
        </div>
        <div
          className={cn("border border-primary/5 px-4 py-6 sm:px-6 lg:px-8")}
        >
          <span className="text-sm font-medium leading-6 text-gray-400">
            Memory
          </span>
          <span className="mt-2 flex items-baseline gap-x-2">
            <span className="text-xl font-semibold tracking-tight text-primary">
              {`${data?.memory} GB RAM`}
            </span>
          </span>
        </div>
        <div
          className={cn("border border-primary/5 px-4 py-6 sm:px-6 lg:px-8")}
        >
          <span className="text-sm font-medium leading-6 text-gray-400">
            Disk
          </span>
          <span className="mt-2 flex items-baseline gap-x-2">
            <span className="text-xl font-semibold tracking-tight text-primary">
              {`${data?.disk} GB`}
            </span>
          </span>
        </div>
        <div
          className={cn("border border-primary/5 px-4 py-6 sm:px-6 lg:px-8")}
        >
          <span className="text-sm font-medium leading-6 text-gray-400">
            Region
          </span>
          <span className="mt-2 flex items-baseline gap-x-2">
            <span className="text-xl font-semibold tracking-tight text-primary">
              {data?.region}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
};
