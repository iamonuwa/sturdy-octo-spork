"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@machines/ui";
import { useLoginWithOAuth, usePrivy } from "@privy-io/react-auth";

export const ProfileDialog = () => {
  const { connectOrCreateWallet } = usePrivy();
  const { initOAuth, loginWithOAuth, loading } = useLoginWithOAuth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">Connect</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Login to continue</DialogTitle>
          <DialogDescription>
            Please login to continue with your action
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="outline"
            disabled={loading}
            onClick={connectOrCreateWallet}
            size="lg"
          >
            Sign in with wallet
          </Button>
          <Button
            variant="outline"
            size="lg"
            disabled={loading}
            onClick={loginWithOAuth}
          >
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            disabled={loading}
            size="lg"
            onClick={() => initOAuth({ provider: "twitter" })}
          >
            Sign in with Twitter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
