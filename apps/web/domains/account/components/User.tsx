"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@machines/ui";

import { FarcasterPFP } from "./avatar/Farcaster";
import { GooglePFP } from "./avatar/Google";
import { TwitterPFP } from "./avatar/Twitter";
import { WalletPFP } from "./avatar/Wallet";
import { shortenHex } from "@/utils/common";
import { useAccount } from "wagmi";
import { useCurrentUser } from "../api/me";
import { useExchangeToken } from "../api/exchange-token";
import { usePrivy } from "@privy-io/react-auth";

export const User = () => {
  const { ready, authenticated, logout, login } = usePrivy();
  const { isPending } = useExchangeToken();
  const { address, isConnected, isConnecting } = useAccount();
  const { data, isLoading, isError, error } = useCurrentUser();

  console.log(
    JSON.stringify(
      {
        data,
        isLoading,
        isError,
        error,
      },
      null,
      2
    )
  );

  if (!ready || isPending || isConnecting)
    return <Skeleton className="h-10 w-10 rounded-full" />;

  if (!authenticated || !isConnected)
    return (
      <Button variant="outline" onClick={login}>
        Sign in to continue
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="releative h-8 w-8" size="icon" variant="ghost">
          <GooglePFP />
          <TwitterPFP />
          <FarcasterPFP />
          <WalletPFP />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <span className="text-xs leading-none font-medium text-muted-foreground">
            {shortenHex(address)}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
