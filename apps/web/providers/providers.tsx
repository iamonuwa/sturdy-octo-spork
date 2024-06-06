"use client";

import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SearchProvider } from "./search.provider";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const Providers: FC<PropsWithChildren<{}>> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <SearchProvider>{children}</SearchProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
};
