import { IUser } from "@kurakani/core"
import { trpc } from "@libs/trpc"
import { FlatList, View } from "react-native"
import FriendCard from "../../ui/FriendCard"

const Friends = ({ user }: { user: IUser }) => {
    const { data } = trpc.getFriendById.useQuery(user._id?.toString())
    return (
        <View className="p-2">
            <FlatList
                data={data?.friends}
                // @ts-ignore
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => <FriendCard user={item} />}
            />
        </View>
    )
}

export default Friends
