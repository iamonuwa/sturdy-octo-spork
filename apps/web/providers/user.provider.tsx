import { FC, PropsWithChildren } from "react";

import { useExchangeToken } from "@/domains/account/api/exchange-token";
import { useToast } from "@machines/ui";
import { useToken } from "@privy-io/react-auth";

export const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { toast } = useToast();
  const { mutateAsync: exchangeToken } = useExchangeToken();

  useToken({
    onAccessTokenGranted: async (accessToken: string) => {
      await exchangeToken(accessToken);
    },

    onAccessTokenRemoved: () => {
      toast({
        title: "Goodbye!",
        description: "You have successfully signed out.",
        variant: "success",
        duration: 3000,
      });
    },
  });

  return <>{children}</>;
};
