import { faker } from "@faker-js/faker"
import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"
import { Image, Text, TouchableOpacity, View } from "react-native"

interface MessageProfileProps {
    user: IUser
    message: string
}

const MessageProfile = ({ user, message }: MessageProfileProps) => {
    const navigation = useNavigation()
    const incoming = faker.number.int(20).toString()
    return (
        <TouchableOpacity
            activeOpacity={5}
            className=" flex-row items-center justify-between py-3"
            // @ts-ignore
            onPress={() => navigation.navigate("MessageChat", { user })}
        >
            <View className="flex-row gap-3 items-center">
                <Image
                    source={{
                        uri: user.avatar,
                    }}
                    className="w-14 h-14 rounded-full "
                    alt="Profile Image"
                />
                <View>
                    <Text className="font-bold text-md">{user.fullName}</Text>
                    <View className="flex-row gap-5 text-sm">
                        <Text className="text-sm text-grayish">{message.slice(0, 20)}....</Text>
                        <Text className="text-sm text-grayLight">
                            {dayjs().diff(faker.date.past().toString(), "day")}
                        </Text>
                    </View>
                </View>
            </View>
            {Math.random() >= 0.5 && (
                <View
                    className={`h-6 ${
                        incoming.length > 1 ? "w-9" : "w-6"
                    } bg-primary flex-row items-center justify-center rounded-full`}
                >
                    <Text className="font-bold text-white text-xs">{incoming.slice(0, 5)}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default MessageProfile
