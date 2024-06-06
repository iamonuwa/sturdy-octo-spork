"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@machines/ui";

import { Button } from "@machines/ui";
import { ChevronDownIcon } from "lucide-react";
import { INSTANCE_STATES } from "@/config";
import { useSearchContext } from "@/providers/search.provider";

export const Filter = () => {
  const { search, state } = useSearchContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white dark:bg-gray-950">
          Filters <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {INSTANCE_STATES.map((instance_state, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            onCheckedChange={() => search(instance_state)}
            checked={state.query === instance_state}
          >
            {instance_state}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
