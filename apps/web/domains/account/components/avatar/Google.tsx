"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@machines/ui";

import { usePrivy } from "@privy-io/react-auth";

export const GooglePFP = () => {
  const { user } = usePrivy();
  if (!user?.google) return null;

  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback>
        {user?.google?.name
          ? user.google.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase()
          : "U"}
      </AvatarFallback>
    </Avatar>
  );
};
