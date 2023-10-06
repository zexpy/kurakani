import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Box from "@components/Box"
import Post from "@components/Post"
import { useCurrentUser } from "@hooks/useCurrentUser"
import { trpc } from "@libs/trpc"
import Loading from "@components/Loading"

export enum ContentType {
    TEXT = "text",
    IMAGE = "image",
}

const Main = ({ navigation }) => {
    const { user } = useCurrentUser()
    // @ts-ignore
    const { data, isLoading } = trpc.getFriendPost.useQuery(user?.friends)

    if (isLoading) {
        return <Loading />
    }

    return (
        <Box>
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
                renderItem={({ item }) => <Post post={item} />}
                showsVerticalScrollIndicator={false}
                className="mb-20"
            />
        </Box>
    )
}

export default Main
