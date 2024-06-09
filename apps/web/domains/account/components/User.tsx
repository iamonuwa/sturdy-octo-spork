"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@machines/ui";

import { PFP } from "./PFP";
import { isAddress } from "viem";
import { shortenHex } from "@/utils/common";
import { useAccount } from "wagmi";
import { useCurrentUser } from "../api/me";
import { useLogout } from "../api/logout";
import { usePrivy } from "@privy-io/react-auth";

export const User = () => {
  const { authenticated, login } = usePrivy();
  const { isConnected } = useAccount();
  const { data } = useCurrentUser();
  const logout = useLogout();

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
          <PFP />
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
