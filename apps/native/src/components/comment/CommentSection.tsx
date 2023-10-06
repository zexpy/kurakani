import { View, Image, Text, TouchableOpacity, Modal } from "react-native"
import dayjs from "dayjs"
import { useState } from "react"
import { trpc } from "@libs/trpc"
import Delete from "@components/Delete"

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
            <Modal visible={isVisible} transparent={true} animationType="slide">
                <Delete
                    handleDelete={handleDelete}
                    setIsVisible={setIsVisible}
                    isLoading={isLoading}
                />
            </Modal>
        </>
    )
}

export default CommentSection
