import React from "react";
import { cn } from "@machines/ui/cn";
import { useVmInstanceQuery } from "../api/instanceQuery";

export const InstanceBanner = () => {
  const { data, isLoading, isError, error } = useVmInstanceQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <header>
      <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-primary px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
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
              <span className="font-semibold text-white">{data?.name}</span>
            </h1>
          </div>
          <p className="mt-2 text-xs leading-6 text-gray-400">
            Deploys from GitHub via main branch
          </p>
        </div>
        <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
          Production
        </div>
      </div>

      <div className="grid grid-cols-1 bg-primary sm:grid-cols-2 lg:grid-cols-4">
        <div
          className={cn(
            "border-t lg:border-l border-white/5 px-4 py-6 sm:px-6 lg:px-8"
          )}
        >
          <span className="text-sm font-medium leading-6 text-gray-400">
            CPU Usage
          </span>
          <span className="mt-2 flex items-baseline gap-x-2">
            <span className="text-xl font-semibold tracking-tight text-white">
              {data?.cpu}
            </span>
          </span>
        </div>
        <div
          className={cn(
            "border-t lg:border-l border-white/5 px-4 py-6 sm:px-6 lg:px-8"
          )}
        >
          <span className="text-sm font-medium leading-6 text-gray-400">
            Memory
          </span>
          <span className="mt-2 flex items-baseline gap-x-2">
            <span className="text-xl font-semibold tracking-tight text-white">
              {`${data?.memory} GB RAM`}
            </span>
          </span>
        </div>
        <div
          className={cn(
            "border-t lg:border-l border-white/5 px-4 py-6 sm:px-6 lg:px-8"
          )}
        >
          <span className="text-sm font-medium leading-6 text-gray-400">
            Disk
          </span>
          <span className="mt-2 flex items-baseline gap-x-2">
            <span className="text-xl font-semibold tracking-tight text-white">
              {`${data?.disk} GB`}
            </span>
          </span>
        </div>
        <div
          className={cn(
            "border-t lg:border-l border-white/5 px-4 py-6 sm:px-6 lg:px-8"
          )}
        >
          <span className="text-sm font-medium leading-6 text-gray-400">
            Region
          </span>
          <span className="mt-2 flex items-baseline gap-x-2">
            <span className="text-xl font-semibold tracking-tight text-white">
              {data?.region}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
};
