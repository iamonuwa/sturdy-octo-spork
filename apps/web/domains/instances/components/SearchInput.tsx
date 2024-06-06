"use client";

import { Input } from "@machines/ui";
import { useSearchContext } from "@/providers/search.provider";

export const SearchInput = () => {
  const { state, search } = useSearchContext();

  return (
    <Input
      type="search"
      placeholder="Search instances..."
      className="bg-white md:flex-1 dark:bg-gray-950"
      onChange={(e) => search(e.target.value)}
      value={state.query}
    />
  );
};
