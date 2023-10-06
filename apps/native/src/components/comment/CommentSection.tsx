import { View, Image, Text, TouchableOpacity } from "react-native"
import dayjs from "dayjs"

interface CommentSectionProps {
    comment: any
}

const CommentSection = ({ comment }: CommentSectionProps) => {
    console.log(comment.createdAt)
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className="border-b border-gray-200 py-2 flex-row"
            onLongPress={() => {
                console.log("hello")
            }}
        >
            <View
                key={comment._id}
                className="flex-row items-center flex-1"
                style={{
                    backgroundColor: "white",
                }}
            >
                <View className="flex-row gap-3 items-center p-1">
                    <Image
                        source={{ uri: comment.user_id.profile_pic }}
                        className="w-12 h-12 rounded-full"
                    />
                    <View className="px-1">
                        <Text className="font-bold text-base">{comment.user_id.fullName}</Text>
                        <Text className="text-gray-800">{comment?.content}</Text>
                    </View>
                </View>
            </View>
            <Text className="text-[11px] text-gray-600 px-1">
                {dayjs(comment?.createdAt).fromNow()}
            </Text>
        </TouchableOpacity>
    )
}

export default CommentSection
