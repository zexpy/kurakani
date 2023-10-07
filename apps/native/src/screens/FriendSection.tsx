import Loading from "@components/Loading"
import { trpc } from "@libs/trpc"
import FriendCard from "../ui/FriendCard"
import { FlatList, Pressable, Text, TextInput, View } from "react-native"
import { useState } from "react"
import { useCurrentUser } from "@hooks/useCurrentUser"
import { useNavigation } from "@react-navigation/native"
import { getSender } from "../helper/user"
import { SafeAreaView } from "react-native-safe-area-context"

const FriendSection = () => {
    const { user } = useCurrentUser()
    const { isLoading, data } = trpc.getFriendById.useQuery(user._id?.toString())
    const [inputSearch, setInputSearch] = useState<string>()
    const navigation = useNavigation()
    const { mutate: accessChatMutate } = trpc.accessChat.useMutation()

    if (isLoading) {
        return <Loading />
    }

    const handleMessage = (id: string) => {
        accessChatMutate(
            {
                user_id: id,
            },
            {
                onSuccess: (data) => {
                    // @ts-ignore
                    const receiver = getSender(data?.users, user)
                    // @ts-ignore
                    navigation.navigate("MessageChat", {
                        chat: data,
                        user,
                        receiver,
                    })
                },
            },
        )
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#fff",
                height: "100%",
            }}
            className="p-5"
        >
            <Text className="text-lg font-bold mb-1">Friends</Text>
            <View className="flex-row gap-3">
                <Pressable
                    className="bg-primary p-2 rounded-xl"
                    onPress={() =>
                        // @ts-ignore
                        navigation.navigate("Suggestion" as never, { user })
                    }
                >
                    <Text className="text-white">Suggestions</Text>
                </Pressable>
                <Pressable
                    className="bg-primary p-2 rounded-xl"
                    onPress={() =>
                        // @ts-ignore
                        navigation.navigate("Friend Request" as never, { user })
                    }
                >
                    <Text className="text-white">Friend Requests</Text>
                </Pressable>
            </View>
            <View className=" mt-3 border-t border-[#ccc]"></View>

            {data.friends.length > 0 ? (
                <View>
                    <TextInput
                        className="mt-3 p-2 border rounded-md border-[#ccc]"
                        value={inputSearch}
                        onChangeText={setInputSearch}
                        placeholder="Search Friends"
                    />
                    <FlatList
                        className="h-[92vh] mt-2"
                        data={data.friends}
                        // @ts-ignore
                        keyExtractor={(user) => user?._id.toString()}
                        renderItem={({ item }) => {
                            if (
                                inputSearch &&
                                // @ts-ignore
                                !item?.fullName
                                    .toUpperCase()
                                    .includes(inputSearch.trim().toUpperCase())
                            ) {
                                return
                            }
                            return (
                                <FriendCard
                                    user={item}
                                    btnLabel="Message"
                                    // @ts-ignore
                                    handleSubmit={() => handleMessage(item?._id.toString())}
                                />
                            )
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            ) : (
                <View className="flex justify-center items-center m-8">
                    <Text className="font-bold text-xl">No friends to show</Text>
                    <Text>When you become friends with people on</Text>
                    <View className="flex-row">
                        <Text className="font-bold">Kurakani</Text>
                        <Text>, they'll appear here.</Text>
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}

export default FriendSection
