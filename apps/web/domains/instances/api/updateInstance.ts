import { Vm, VmAPIResponse } from "@/models/vm"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { UpdateVm } from "@machines/model/vm"
import { useToast } from "@machines/ui"

const updateInstance = async (payload: UpdateVm) => {
    const response = await fetch(`http://localhost:57091/apis/vms/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        const cause = await response.json()
        throw new Error(cause.message)
    }

    return await response.json()
}

export const useUpdateInstance = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation<VmAPIResponse, Error, UpdateVm>({
        mutationFn: updateInstance,
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
