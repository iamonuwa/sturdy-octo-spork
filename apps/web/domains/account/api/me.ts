import Cookies from 'js-cookie'
import { useQuery } from "@tanstack/react-query"

const currentUser = async (token: string | undefined) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        const cause = await response.json()
        throw new Error(cause.message)
    }

    return await response.json()
}

export const useCurrentUser = () => {
    const token = Cookies.get("authToken")

    return useQuery<string, Error, string>({
        queryKey: ["currentUser"],
        enabled: !!token,
        queryFn: () => currentUser(token)
    })
}
