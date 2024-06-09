"use client";

import { FC, PropsWithChildren } from "react";
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";

import { SearchProvider } from "./search.provider";
import { UserProvider } from "./user.provider";
import { baseSepolia } from "viem/chains";
import { http } from "viem";

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ["wallet", "email", "sms", "twitter", "google", "farcaster"],
  appearance: {
    showWalletLoginFirst: true,
  },
};

export const Providers: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string} // @todo fix this
        config={privyConfig}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
            <UserProvider>
              <SearchProvider>{children}</SearchProvider>
            </UserProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </>
  );
};
