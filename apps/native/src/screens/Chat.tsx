import { Text, View } from "react-native"
import { ChevronDownIcon } from "react-native-heroicons/outline"
import MessageProfile from "@components/chat/MessageProfile"
import { trpc } from "@libs/trpc"
import Loading from "@components/Loading"
import { FlatList } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState, useCallback } from "react"
import { RefreshControl } from "react-native"

export default function Chat() {
    const { data, isLoading, refetch } = trpc.getChats.useQuery()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const handleRefresh = useCallback(() => {
        setIsRefreshing(true)
        refetch()
        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }, [isRefreshing])

    if (isLoading) {
        return <Loading />
    }
    return (
        <SafeAreaView
            className="p-3"
            style={{
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <View className="py-2 flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                    <Text className="font-bold text-2xl">Messages</Text>
                    <ChevronDownIcon size={20} color="black" />
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <MessageProfile user={item} />}
                keyExtractor={(item) => item._id.toString()}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}
