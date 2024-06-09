'use client';

import Cookies from 'js-cookie'
import { Vm } from "@/models/vm"
import { useQuery } from "@tanstack/react-query"

const fetchInstances = async (token: string | undefined) => {

    if (!token) return

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/instances`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const cause = await response.json()
        throw new Error(cause.message)
    }

    const { data } = await response.json()

    return data
}

export const useVmInstances = () => {
    const token = Cookies.get("authToken")

    return useQuery<string[], Error, Vm[]>({
        queryKey: ["instances"],
        enabled: !!token,
        queryFn: () => fetchInstances(token)
    })
}
