import { TokenProvider, useUserStore } from "@kurakani/core"
import { IStorageUser } from "./useAuth"
import { useEffect, useRef, useState } from "react"
import { trpc } from "@libs/trpc"
import { setToken as saveHeader } from "@libs/api"

export const useCurrentUser = () => {
    const [token, setToken] = useState<IStorageUser>()
    const { mutate, isLoading } = trpc.getUserById.useMutation()
    const { user, setUser } = useUserStore()
    const lastUsedToken = useRef("")

    useEffect(() => {
        const getToken = async () => {
            const token = JSON.parse(await TokenProvider.getItem("user")) as IStorageUser
            if (token?.jwt && token.jwt !== lastUsedToken.current) {
                setToken(token)
                saveHeader(token.jwt)
                lastUsedToken.current = token.jwt
            }
        }
        getToken()
    }, [])

    useEffect(() => {
        if (token) {
            mutate(token.user._id, {
                onSuccess: (data) => {
                    // @ts-ignore
                    setUser(data)
                },
            })
        }
    }, [token])

    return { user, isLoading, setUser }
}
