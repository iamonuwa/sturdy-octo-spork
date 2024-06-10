import { CpuIcon, MemoryStickIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@machines/ui";

import { Button } from "@machines/ui";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import Link from "next/link";
import { Separator } from "@machines/ui";
import { Vm } from "@/models/vm";
import { cn } from "@machines/ui/cn";
import { formatDistanceStrict } from "date-fns";
import { isAddress } from "viem";
import { shortenHex } from "@/utils/common";
import { useAccount } from "wagmi";
import { useCurrentUser } from "@/domains/account/api/me";
import { useUpdateInstanceMutation } from "../api/updateInstanceMutation";

interface Props extends Vm {}

export const Instance: FC<Props> = (props) => {
  const { data, isLoading } = useCurrentUser();
  const { mutateAsync: updateInstance } = useUpdateInstanceMutation();
  const { address } = useAccount();
  const {
    cpu,
    created_at,
    last_updated_at,
    disk,
    id,
    name,
    region,
    status,
    from,
  } = props;
  return (
    <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
      <div className="p-2 grid gap-1 flex-1">
        <span className="font-medium">{name}</span>
        <div className="flex gap-2">
          <span className="text-gray-500 dark:text-gray-400 capitalize">
            {isAddress(from.identifier)
              ? shortenHex(from.identifier, 8)
              : from.display_name}
          </span>
        </div>
      </div>
      <Separator className="my-2 lg:hidden" />
      <div className="p-2 grid gap-1 flex-1 grid-col-1">
        <span className="lg:ml-6">{region}</span>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75",
                {
                  "bg-green-400 animate-ping": status === "RUNNING",
                }
              )}
            />
            <span
              className={cn("relative inline-flex rounded-full h-3 w-3", {
                "bg-green-400": status === "RUNNING",
                "bg-red-400": status === "TERMINATED",
              })}
            />
          </span>
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
          {cpu} vCPUs
        </div>
        <div className="flex items-center gap-2">
          <MemoryStickIcon className="w-4 h-4" />
          {disk} GB RAM
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
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/instances/${id}`}>View Instance</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/instances/${id}/source-tree`}>View Source tree</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {(data || !isLoading) &&
          // manually check if the user is the creator of the instance
          // in a real-world scenario, this should be done on the server
          isAddress(data?.identifier as `0x${string}`) &&
          data?.identifier === address ? (
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
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
