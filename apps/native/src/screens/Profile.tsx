import { Text, View } from "react-native"
import Box from "@components/Box"
import { setToken } from "@libs/api"

export default function Profile() {
    // const { isError, data, isLoading, error } = trpc.getUser.useQuery()

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-red-500">Hello</Text>
        </View>
    )
}
