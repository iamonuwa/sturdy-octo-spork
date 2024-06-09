import { useAccount, useDisconnect } from "wagmi"

import Cookies from 'js-cookie'
import { useMutation } from "@tanstack/react-query"
import { usePrivy } from "@privy-io/react-auth"
import { useToast } from "@machines/ui"

const exchangeToken = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/exchange/`, {
        method: "POST",
        body: JSON.stringify({
            token
        }),
    })

    if (!response.ok) {
        const cause = await response.json()
        throw new Error(cause.message)
    }

    const { data } = await response.json()

    return data
}

export const useExchangeToken = () => {
    const { toast } = useToast()
    const { logout } = usePrivy();
    const { isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    return useMutation<string, Error, string>({
        mutationFn: exchangeToken,
        onError: (error) => {
            logout()
            if (isConnected) disconnect()
            Cookies.remove("authToken")
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
                duration: 3000,
            })
        },
        onSuccess: (response) => {
            Cookies.set("authToken", response)
        },
    })
}
