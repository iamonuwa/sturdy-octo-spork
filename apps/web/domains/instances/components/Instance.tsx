import { CpuIcon, MemoryStickIcon, MoveHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@machines/ui";

import { Button } from "@machines/ui";
import { FC } from "react";
import Link from "next/link";
import { Separator } from "@machines/ui";
import { Vm } from "@/models/vm";
import { cn } from "@machines/ui/cn";
import { formatDistanceStrict } from "date-fns";
import { useUpdateInstance } from "../api/updateInstance";

interface Props extends Vm {}

export const Instance: FC<Props> = (props) => {
  const { mutateAsync: updateInstance } = useUpdateInstance();
  const {
    cpuCores,
    created_at,
    last_updated_at,
    diskSizeGB,
    id,
    name,
    status,
  } = props;
  return (
    <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
      <div className="p-2 grid gap-1 flex-1">
        <div className="font-medium">{name}</div>
        <div className="flex gap-2">
          <span className="text-gray-500 dark:text-gray-400 capitalize">
            {String(status).toLocaleLowerCase()}
          </span>
        </div>
      </div>
      <Separator className="my-2 lg:hidden" />
      <div className="p-2 grid gap-1 flex-1">
        <div className="flex items-start gap-2">
          <span
            className={cn("inline-flex w-3 h-3 rounded-full translate-y-1", {
              "bg-red-400": status === "TERMINATED",
              "bg-green-400": status === "RUNNING",
            })}
          />
          <span className="flex gap-1 capitalize">
            {String(status).toLocaleLowerCase()}
            {status === "RUNNING" ? (
              <span className="text-gray-500 dark:text-gray-400">
                {`${formatDistanceStrict(
                  new Date(last_updated_at),
                  new Date(),
                  {}
                )}`}
              </span>
            ) : null}
          </span>
        </div>
      </div>
      <Separator className="my-2 lg:hidden" />
      <div className="p-2 grid gap-1 flex-1">
        <div className="flex items-center gap-2">
          <CpuIcon className="w-4 h-4" />
          {cpuCores} vCPUs
        </div>
        <div className="flex items-center gap-2">
          <MemoryStickIcon className="w-4 h-4" />
          {diskSizeGB} GB RAM
        </div>
      </div>
      <Separator className="my-2 lg:hidden" />
      <div className="p-2 grid gap-1 flex-1">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          {`Created ${formatDistanceStrict(new Date(created_at), new Date(), {
            addSuffix: true,
          })}`}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
          >
            <MoveHorizontalIcon className="w-4 h-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/instances/${id}`}>View Instance</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/instances/${id}`}>Manage</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              updateInstance({
                id,
                status: status === "RUNNING" ? "TERMINATED" : "RUNNING",
              })
            }
          >
            {status === "RUNNING" ? "Terminate" : "Restart"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
