"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Skeleton,
} from "@machines/ui";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export const UserProfile = () => {
  const { isLoading, error, user } = useUser();

  if (isLoading) return <Skeleton className="h-10 w-10 rounded-full" />;

  if (error) return <div>{error.message}</div>;

  if (!user)
    return (
      <Button variant="outline" asChild>
        <Link className="text-sm" passHref href="/api/auth/login">
          Sign in to continue
        </Link>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user?.picture ? (
              <AvatarImage src={user.picture} alt={`${user.name}`} />
            ) : (
              <AvatarFallback>
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium leading-none">
              {user.nickname}
            </span>
            <span className="text-xs leading-none text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link passHref href="/api/auth/logout">
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
