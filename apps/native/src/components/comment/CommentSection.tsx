import { View, Image, Text, TouchableOpacity, Modal, ActivityIndicator } from "react-native"
import dayjs from "dayjs"
import { useState } from "react"
import { trpc } from "@libs/trpc"

interface CommentSectionProps {
    comment: any
    postId: string
    userId: string
}

const CommentSection = ({ comment, postId, userId }: CommentSectionProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const { isLoading, mutate: deleteMutation } = trpc.deleteComment.useMutation()
    const [delCommentId, setDelCommentId] = useState<string>()
    const utils = trpc.useContext()

    const handleDelete = async () => {
        deleteMutation(
            {
                comment_id: comment._id,
                post_id: postId,
            },
            {
                onSuccess: (data) => {
                    setDelCommentId(data)
                    setIsVisible(false)
                    utils.getFriendPost.invalidate()
                },
            },
        )
    }

    if (delCommentId === comment._id) {
        return null
    }
    return (
        <>
            <TouchableOpacity
                activeOpacity={0.8}
                className="border-b border-gray-200 py-2 flex-row"
                onLongPress={() => {
                    if (userId !== comment.user_id._id) {
                        return
                    }
                    setIsVisible(true)
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
            <Modal
                visible={isVisible}
                animationType="slide"
                style={{
                    height: "100px",
                }}
            >
                <View className="flex items-center py-2">
                    <Text className="text-lg font-bold">Are you sure?</Text>
                    <View className="flex-row justify-center gap-5 py-2">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="bg-rose-500 rounded-md p-3 w-32"
                            onPress={handleDelete}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text className="text-white text-center">Yes, delete it</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="bg-primary rounded-md p-3 w-20"
                            onPress={() => {
                                setIsVisible(false)
                            }}
                        >
                            <Text className="text-white text-center">No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default CommentSection
