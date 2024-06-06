"use client";

import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SearchProvider } from "./search.provider";

export const Providers: FC<PropsWithChildren<{}>> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>{children}</SearchProvider>
      </QueryClientProvider>
    </>
  );
};
