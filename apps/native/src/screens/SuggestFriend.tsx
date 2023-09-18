import Loading from "@components/Loading"
import { trpc } from "@libs/trpc"
import { Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import SuggestionCard from "@components/friend/SuggestionCard"

const SuggestFriend = ({ route }) => {
    const user = route.params.user
    const { isLoading, data } = trpc.getAllUser.useQuery()

    if (isLoading) {
        return <Loading />
    }

    return (
        <View className="p-4">
            <Text className="text-lg font-bold">People you may know</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((people) => {
                    if (people._id === user._id || user.friends.includes(people._id)) {
                        return null
                    }

                    return (
                        <SuggestionCard people={people} key={people._id.toString()} user={user} />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default SuggestFriend
