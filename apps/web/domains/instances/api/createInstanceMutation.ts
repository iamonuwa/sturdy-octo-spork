import { Vm, VmAPIResponse } from "@/models/vm"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import Cookies from 'js-cookie'
import { CreateVm } from "@machines/model/vm"
import { useToast } from "@machines/ui"

const createInstance = async (payload: CreateVm, token: string | undefined) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/instances`, {
        method: "POST",
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

export const useCreateInstanceMutation = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const token = Cookies.get("authToken")

    return useMutation<VmAPIResponse, Error, CreateVm>({
        mutationFn: (payload) => createInstance(payload, token),
        onError: (error) => {
            toast({
                title: "Error creating instance",
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
                title: "Instance created",
                description: response.message,
                variant: "success",
                duration: 3000,
            })
        },
    })
}
