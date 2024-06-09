"use client";

import { Avatar, AvatarFallback } from "@machines/ui";

import { usePrivy } from "@privy-io/react-auth";

export const WalletPFP = () => {
  const { user } = usePrivy();

  if (!user?.wallet) return null;

  return (
    <Avatar className="h-8 w-8">
      {/* @todo: could use blockies here instead */}
      <AvatarFallback>W</AvatarFallback>
    </Avatar>
  );
};
