import { Vm, VmAPIResponse } from "@/models/vm"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import Cookies from 'js-cookie'
import { UpdateVm } from "@machines/model/vm"
import { useParams } from "next/navigation"
import { useToast } from "@machines/ui"

const updateInstance = async (payload: UpdateVm, token: string | undefined) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/instances/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        const cause = await response.json()
        throw new Error(cause.message)
    }

    return await response.json()
}

export const useUpdateInstanceMutation = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const token = Cookies.get("authToken")

    return useMutation<VmAPIResponse, Error, UpdateVm>({
        mutationFn: (payload) => updateInstance(payload, token),
        onError: (error) => {
            toast({
                title: "Error updating instance",
                description: error.message,
                variant: "destructive",
                duration: 3000,
            })
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "instances" })
            queryClient.setQueryData<Vm[]>(["instances"], (oldData) => {
                return oldData ? [...oldData, response.data] : [response.data]
            })
            toast({
                title: "Instance state updated",
                description: response.message,
                variant: "success",
                duration: 3000,
            })
        },
    })
}
