import { Text, Pressable, View, ActivityIndicator, Image } from "react-native"

interface IFriendCardProps {
    isLoading?: boolean
    btnLabel?: string
    handleSubmit?: () => void
    user: any
}
const FriendCard = ({ isLoading, btnLabel, user, handleSubmit }: IFriendCardProps) => {
    const { fullName, email, profile_pic } = user
    return (
        <View className="my-2 flex-row justify-between items-center p-3 bg-gray-100 rounded-md shadow-2xl">
            <View className={`flex flex-row items-center gap-3`}>
                <Image
                    source={{
                        uri: profile_pic,
                    }}
                    className="h-14 w-14 rounded-full"
                />
                <View>
                    <Text className="font-bold">{fullName}</Text>
                    <Text className="text-xs text-gray py-[1]">{email}</Text>
                </View>
            </View>
            {btnLabel && (
                <Pressable className="bg-primary w-24 rounded-md py-2" onPress={handleSubmit}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text className="text-center text-white font-bold">{btnLabel}</Text>
                    )}
                </Pressable>
            )}
        </View>
    )
}

export default FriendCard
