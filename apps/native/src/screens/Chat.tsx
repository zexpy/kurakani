import { Text, View, ScrollView } from "react-native"
import { ChevronDownIcon } from "react-native-heroicons/outline"
import Box from "@components/Box"
import MessageProfile from "@components/chat/MessageProfile"
import { trpc } from "@libs/trpc"
import Loading from "@components/Loading"

export default function Chat() {
    const { data, isLoading } = trpc.getChats.useQuery()
    if (isLoading) {
        return <Loading />
    }
    return (
        <Box>
            <View className="p-2 flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <Text className="font-bold text-2xl">Messages</Text>
                    <ChevronDownIcon size={24} color="black" />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((user) => (
                    <MessageProfile user={user} key={user._id.toString()} />
                ))}
            </ScrollView>
        </Box>
    )
}
