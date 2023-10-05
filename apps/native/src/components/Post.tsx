import { View, Text, Image } from "react-native"
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid"
import colors from "../assets/colors"
import { useState } from "react"
import Toast from "react-native-toast-message"
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon } from "react-native-heroicons/outline"
import { HandThumbUpIcon as HandThumbUpSolid } from "react-native-heroicons/solid"
import { TouchableOpacity } from "react-native-gesture-handler"
import dayjs from "dayjs"
import { trpc } from "@libs/trpc"
import { useCurrentUser } from "@hooks/useCurrentUser"
import { RouterOutput } from "types/user"

type OutPost = RouterOutput["getFriendPost"]
interface PostProps {
    post: OutPost[0]
}

export default function Post({ post }: PostProps) {
    const utils = trpc.useContext()
    const { user } = useCurrentUser()

    const [status, setStatus] = useState({
        like: { count: post.likes.length, state: post.likes.includes(user._id) },
        comment: { count: post.comments.length },
    })
    const { mutate: updateMutation } = trpc.updateLike.useMutation()

    return (
        <View className="bg-gray-200 rounded-lg overflow-hidden p-4 my-3">
            {/* // Profile */}
            <View className="flex-row justify-between">
                <View className="flex-row items-center gap-2">
                    <Image
                        source={{
                            uri: post.user_id.profile_pic,
                        }}
                        className="w-10 h-10 rounded-full "
                        alt="Profile Image"
                    />
                    <View>
                        <Text className="font-bold">{post.user_id.fullName}</Text>
                        <Text className="text-xs text-gray">{dayjs(post.createdAt).fromNow()}</Text>
                    </View>
                </View>
                <EllipsisHorizontalIcon color={colors.gray} onPress={async () => {}} />
            </View>
            {/* // Profile Description */}
            <View className="mt-4 mb-3">
                {Boolean(post.image) ? (
                    <Image
                        source={{
                            uri: post.image,
                        }}
                        className="w-full h-96 mb-3 rounded-md object-contain"
                        alt="SOmething"
                    />
                ) : null}
                {Boolean(post.content) ? <Text className="text-lg">{post.content}</Text> : null}
            </View>
            <View className="flex-row px-2 gap-2 mt-[1px] items-center">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center mx-6"
                    onPress={() => {
                        setStatus((prev) => ({
                            ...prev,
                            like: {
                                count: prev.like.state ? prev.like.count - 1 : prev.like.count + 1,
                                state: !prev.like.state,
                            },
                        }))
                        updateMutation(
                            {
                                post_id: post._id,
                            },
                            {
                                onSuccess: () => {
                                    utils.getFriendPost.invalidate()
                                },
                            },
                        )
                    }}
                >
                    {status.like.state ? (
                        <HandThumbUpSolid color={colors.primary} size={30} />
                    ) : (
                        <HandThumbUpIcon color={colors.gray} size={30} />
                    )}
                    <Text className="font-bold text-sm px-1">
                        {status.like.count} like{status.like.count > 0 && "s"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center" onPress={() => {}}>
                    <ChatBubbleOvalLeftEllipsisIcon color={colors.primary} size={30} />
                    <Text className="font-bold text-sm px-1">
                        {post.comments.length} comment{post.comments.length > 0 && "s"}
                    </Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </View>
    )
}
