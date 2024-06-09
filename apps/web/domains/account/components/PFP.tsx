"use client";

import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@machines/ui";

import React from "react";
import { useCurrentUser } from "../api/me";

export const PFP = () => {
  const { data, isLoading, isError, error } = useCurrentUser();

  if (isLoading) return <Skeleton className="h-8 w-8 rounded-full" />;

  if (isError) return <AvatarFallback>{error.message}</AvatarFallback>;

  if (!data) return null;

  return (
    <Avatar className="h-8 w-8">
      {data.photo_url !== "N/A" ? (
        <AvatarImage src={`${data.photo_url}`} alt={`${data.display_name}`} />
      ) : (
        <AvatarFallback>
          {data.display_name
            ? data.display_name
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
