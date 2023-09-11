import Box from '@components/Box'
import { setToken } from '@libs/api'
import { trpc } from '@libs/trpc'
import { Button, Text, View } from 'react-native'
export default function Profile() {
    const { isLoading, mutate, data } = trpc.loginUser.useMutation({
        onSuccess: data => {
            setToken(data.jwt)
        },
    })

    const users = trpc.getAllUser.useQuery()

    if (isLoading) {
        return (
            <Box>
                <Text>Loading..........</Text>
            </Box>
        )
    }

    return (
        <View className="flex-1 justify-center items-center gap-10">
            <Text className="text-red-500">My name is {data?.user?.email}</Text>
            <Button
                title="Login"
                onPress={() =>
                    mutate({
                        email: 'hshshs@gmail.com',
                        password: '12',
                    })
                }
            />
            <Button
                title="GET AGAIN USERS"
                onPress={() => {
                    users.refetch()
                }}
            />
        </View>
    )
}
