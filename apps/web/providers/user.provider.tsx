import { FC, PropsWithChildren } from "react";

import { useExchangeToken } from "@/domains/account/api/exchange-token";
import { useToken } from "@privy-io/react-auth";

export const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { mutateAsync: exchangeToken } = useExchangeToken();

  useToken({
    onAccessTokenGranted: async (accessToken: string) => {
      await exchangeToken(accessToken);
    },
    onAccessTokenRemoved: () => {},
  });

  return <>{children}</>;
};
