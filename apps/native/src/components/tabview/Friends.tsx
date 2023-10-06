import { IUser } from "@kurakani/core"
import { Text } from "react-native"
import { View } from "react-native"

const Friends = ({ user }: { user: IUser }) => {
    return (
        <View className="flex-1">
            <Text>{user.fullName}</Text>
        </View>
    )
}

export default Friends
