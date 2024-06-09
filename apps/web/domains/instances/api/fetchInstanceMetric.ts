import { Vm } from "@/models/vm"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

const fetchInstanceMetrics = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/instances/${id}/metrics`, {
        method: "GET"
    })

    if (!response.ok) {
        const cause = await response.json()
        throw new Error(cause.message)
    }

    const { data } = await response.json()

    return data
}

export const useVmInstanceMetrics = () => {
    const { id } = useParams<{ id: string }>()

    return useQuery<string[], Error, Vm>({
        queryKey: ["fetchInstanceMetrics", id],
        enabled: !!id,
        queryFn: () => fetchInstanceMetrics(id)
    })
}
