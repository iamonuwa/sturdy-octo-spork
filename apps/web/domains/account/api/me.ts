import Cookies from 'js-cookie'
import { User } from '@/models/user'
import { useQuery } from "@tanstack/react-query"

const currentUser = async (token: string | undefined) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        const cause = await response.json()
        throw new Error(cause.message)
    }

    const { data } = await response.json()

    return data
}

export const useCurrentUser = () => {
    const token = Cookies.get("authToken")

    return useQuery<undefined, Error, User>({
        queryKey: ["currentUser"],
        enabled: !!token,
        queryFn: () => currentUser(token)
    })
}
