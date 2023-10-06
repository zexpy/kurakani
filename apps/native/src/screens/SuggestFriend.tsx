import Loading from "@components/Loading"
import { trpc } from "@libs/trpc"
import { Text, View, FlatList } from "react-native"
import SuggestionCard from "@components/friend/SuggestionCard"
import { useState, useCallback } from "react"
import { RefreshControl } from "react-native"

const SuggestFriend = ({ route }) => {
    const user = route.params.user
    const { isLoading, data, refetch } = trpc.getAllUser.useQuery()
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
        <View
            className="p-4"
            style={{
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <Text className="text-lg font-bold">People you may know</Text>
            <FlatList
                data={data.filter(
                    (people) =>
                        people._id !== user._id &&
                        !user.friends.includes(people._id) &&
                        people.fullName,
                )}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => <SuggestionCard people={item} user={user} />}
                showsVerticalScrollIndicator={false}
                className="mb-20"
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
            />
        </View>
    )
}

export default SuggestFriend
