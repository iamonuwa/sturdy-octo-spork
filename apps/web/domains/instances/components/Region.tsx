"use client";

import { ChevronDownIcon, GlobeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@machines/ui";

import { Button } from "@machines/ui";
import { REGIONS } from "@/config";
import { useSearchContext } from "@/providers/search.provider";

export const Regions = () => {
  const { search, state } = useSearchContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white dark:bg-gray-950">
          Regions <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {REGIONS.map((region, index) => (
          <DropdownMenuCheckboxItem
            onCheckedChange={() => search(region)}
            checked={state.query === region}
            key={index}
          >
            <GlobeIcon className="mr-2 h-4 w-4" />
            {region}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
