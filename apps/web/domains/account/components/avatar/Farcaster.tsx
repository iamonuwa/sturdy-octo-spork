"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@machines/ui";

import { usePrivy } from "@privy-io/react-auth";

export const FarcasterPFP = () => {
  const { user } = usePrivy();

  if (!user?.farcaster) return null;

  return (
    <Avatar className="h-8 w-8">
      {user.farcaster.pfp ? (
        <AvatarImage
          src={`${user.farcaster.pfp}`}
          alt={`${user.farcaster.displayName}`}
        />
      ) : (
        <AvatarFallback>
          {user?.farcaster?.displayName
            ? user.farcaster.displayName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()
            : "U"}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
