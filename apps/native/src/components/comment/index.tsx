import { useCurrentUser } from "@hooks/useCurrentUser"
import { trpc } from "@libs/trpc"
import React, { useState } from "react"
import { ActivityIndicator, FlatList } from "react-native"
import { TextInput, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CommentSection from "./CommentSection"

const Comment = ({ route }) => {
    const { post } = route?.params
    const { user } = useCurrentUser()
    const utils = trpc.useContext()
    const [comment, setComment] = useState<string>()
    const { isLoading, mutate: addCommentMutate } = trpc.addComment.useMutation()
    const [allComment, setAllComment] = useState(post.comments)
    const handlePostComment = async () => {
        if (!comment) {
            return
        }
        addCommentMutate(
            {
                content: comment,
                post_id: post._id,
            },
            {
                onSuccess: (data) => {
                    setComment("")
                    setAllComment((prev: any) => [...prev, data])
                    utils.getFriendPost.invalidate()
                },
            },
        )
    }
    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%" }} className="p-3">
            <FlatList
                data={allComment}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <CommentSection comment={item} postId={post._id} userId={user._id} />
                )}
                showsVerticalScrollIndicator={false}
            />
            <View className="flex-row text-center gap-2 items-center">
                <TextInput
                    className="px-4 py-4 border-[1px] border-gray-300 rounded-md text-grayText text-lg mt-3 flex-1"
                    placeholder="Add a new comment ..."
                    value={comment}
                    onChangeText={setComment}
                    autoFocus
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handlePostComment}
                    className={`${
                        comment ? "bg-primary" : "bg-gray-500"
                    } rounded-md w-20 h-10 justify-center`}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text className="text-center p-2 text-white rounded-md">Comment</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Comment
