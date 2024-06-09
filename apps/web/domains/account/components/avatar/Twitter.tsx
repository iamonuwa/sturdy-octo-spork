"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@machines/ui";

import { usePrivy } from "@privy-io/react-auth";

export const TwitterPFP = () => {
  const { user } = usePrivy();
  if (!user?.twitter) return null;

  return (
    <Avatar className="h-8 w-8">
      {user.twitter.profilePictureUrl ? (
        <AvatarImage
          src={`${user.twitter.profilePictureUrl}`}
          alt={`${user.twitter.username}`}
        />
      ) : (
        <AvatarFallback>
          {user?.twitter?.username
            ? user.twitter.username
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
