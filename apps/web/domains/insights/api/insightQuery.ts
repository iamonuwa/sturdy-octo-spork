'use client';

import { Insight } from "../../../models/insight"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

const fetchInsights = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/insights`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        const cause = await response.json()
        throw new Error(cause.message)
    }

    const { data } = await response.json()

    return data
}

export const useInsights = () => {
    const { id } = useParams<{ id: string }>()
    return useQuery<string[], Error, Insight[]>({
        queryKey: ["insights", id],
        enabled: !!id,
        queryFn: fetchInsights
    })
}
