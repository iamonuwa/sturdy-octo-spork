import { Vm } from "@/models/vm"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

const fetchInstance = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/instances/${id}`, {
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

export const useVmInstanceQuery = () => {
    const { id } = useParams<{ id: string }>()

    return useQuery<string[], Error, Vm>({
        queryKey: ["instance", id],
        enabled: !!id,
        queryFn: () => fetchInstance(id)
    })
}
