import { faker } from "@faker-js/faker"
import { useCurrentUser } from "@hooks/useCurrentUser"
import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"
import { getSender } from "../../helper/user"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { RouterOutput } from "types/user"

type MessageTypes = RouterOutput["getChats"][0]

interface MessageProfileProps {
    user: MessageTypes
}

const MessageProfile = ({ user }: MessageProfileProps) => {
    const navigation = useNavigation()
    const { user: logUser } = useCurrentUser()
    // @ts-ignore
    const latestMessage = user?.latestMessage
    // @ts-ignore
    const sender = getSender(logUser, user?.users)
    return (
        <TouchableOpacity
            activeOpacity={5}
            className=" flex-row items-center justify-between py-3"
            onPress={() =>
                // @ts-ignore
                navigation.navigate("MessageChat", {
                    sender: sender,
                    chatId: user._id.toString(),
                    user: logUser,
                })
            }
        >
            <View className="flex-row gap-3 items-center">
                <Image
                    source={{
                        // @ts-ignore
                        uri: sender.profile_pic,
                    }}
                    className="w-14 h-14 rounded-full "
                    alt="Profile Image"
                />
                <View>
                    <Text className="font-bold text-md">{sender.fullName}</Text>
                    <View className="flex-row gap-5 text-sm">
                        <Text
                            className={`text-xs text-grayish ${
                                !latestMessage?.isRead ? "font-bold" : ""
                            }`}
                        >
                            {latestMessage?.content.slice(0, 20)}....
                        </Text>
                        <Text className="text-sm text-grayLight">
                            {dayjs().diff(faker.date.past().toString(), "day")}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MessageProfile
