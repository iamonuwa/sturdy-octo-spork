import { useAccount, useDisconnect } from 'wagmi';

import Cookies from 'js-cookie'
import { useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useToast } from '@machines/ui';

export const useLogout = () => {
    const { logout } = usePrivy();
    const { isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { toast } = useToast()

    return useCallback(async () => {
        logout()
        if (isConnected) disconnect()
        Cookies.remove("authToken")
    }, [disconnect, isConnected, logout]);
}
