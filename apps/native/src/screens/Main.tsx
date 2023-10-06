import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Post from "@components/Post"
import { useCurrentUser } from "@hooks/useCurrentUser"
import { trpc } from "@libs/trpc"
import Loading from "@components/Loading"
import { RefreshControl } from "react-native"
import { useState, useCallback } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

export enum ContentType {
    TEXT = "text",
    IMAGE = "image",
}

const Main = ({ navigation }) => {
    const { user } = useCurrentUser()
    // @ts-ignore
    const { data, isLoading, refetch } = trpc.getFriendPost.useQuery(user?.friends)
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
            style={{
                backgroundColor: "#fff",
                height: "100%",
            }}
            className="p-5"
        >
            <View className="flex flex-row justify-between items-center pb-2">
                <Text className="text-xl font-bold">Latest Posts</Text>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        source={{
                            uri: user.profile_pic,
                        }}
                        className="h-10 w-10 rounded-full"
                    />
                </TouchableOpacity>
            </View>
            {/* <Story /> */}
            <FlatList
                data={data}
                keyExtractor={(post) => post._id}
                renderItem={({ item }) => <Post post={item} user={user} />}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
            />
        </SafeAreaView>
    )
}

export default Main
