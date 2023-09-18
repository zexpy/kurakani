import { FlatList } from "react-native"
import { useCurrentUser } from "@hooks/useCurrentUser"
import { trpc } from "@libs/trpc"
import PostCard from "@components/post/PostCard"
import Loading from "@components/Loading"

const Post = () => {
    const { user } = useCurrentUser()
    const { data, isLoading } = trpc.getPostByUserId.useQuery(user._id.toString())

    if (isLoading) {
        return <Loading />
    }
    console.log(data[0])
    return (
        <FlatList
            keyExtractor={(item) => item._id.toString()}
            data={data}
            renderItem={({ item }) => <PostCard user={user} post={item} />}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default Post
