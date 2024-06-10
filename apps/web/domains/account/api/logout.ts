import { useAccount, useDisconnect } from 'wagmi';

import Cookies from 'js-cookie'
import { useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
    const { logout } = usePrivy();
    const { isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const queryClient = useQueryClient()

    return useCallback(async () => {
        logout()
        if (isConnected) disconnect()
        Cookies.remove("authToken")
        queryClient.setQueryData(["currentUser"], null)
    }, [disconnect, isConnected, logout, queryClient]);
}
