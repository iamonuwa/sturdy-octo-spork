'use client';

import { Vm } from "@/models/vm"
import { useQuery } from "@tanstack/react-query"

const fetchInstances = async () => {
    const response = await fetch("http://localhost:57091/apis/vms", {
        method: "GET"
    })

    if (!response.ok) {
        const cause = await response.json()
        throw new Error(cause.message)
    }

    const { data } = await response.json()

    return data
}

export const useVmInstances = () => {
    return useQuery<string[], Error, Vm[]>({
        queryKey: ["instances"],
        queryFn: fetchInstances
    })
}
