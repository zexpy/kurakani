import { FlatList } from "react-native"
import { trpc } from "@libs/trpc"
import Loading from "@components/Loading"
import { IUser } from "@kurakani/core"
import PostCard from "@components/Post"

const Post = ({ user }: { user: IUser }) => {
    const { data, isLoading } = trpc.getPostByUserId.useQuery(user._id.toString())

    if (isLoading) {
        return <Loading />
    }
    return (
        <FlatList
            keyExtractor={(item) => item._id.toString()}
            data={data}
            renderItem={({ item }) => <PostCard user={user} post={item} />}
            showsVerticalScrollIndicator={false}
            className="p-3 mb-4"
        />
    )
}

export default Post
