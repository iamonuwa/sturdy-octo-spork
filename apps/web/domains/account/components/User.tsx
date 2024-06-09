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
import { isAddress } from "viem";
import { shortenHex } from "@/utils/common";
import { useAccount } from "wagmi";
import { useCurrentUser } from "../api/me";
import { useExchangeToken } from "../api/exchange-token";
import { usePrivy } from "@privy-io/react-auth";

export const User = () => {
  const { authenticated, logout, login } = usePrivy();
  const { isPending } = useExchangeToken();
  const { address, isConnected, isConnecting } = useAccount();
  const { data, isLoading, isError, error } = useCurrentUser();

  if (isError)
    return (
      <span className="text-xs font-medium text-muted-foreground">
        {error.message}
      </span>
    );

  if (isLoading || isPending || isConnecting)
    return <Skeleton className="h-10 w-10 rounded-full" />;

  if (!authenticated || !isConnected || !data)
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
          {isAddress(data.identifier)
            ? shortenHex(data.identifier)
            : data.identifier}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
