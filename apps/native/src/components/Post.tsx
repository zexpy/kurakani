import { View, Text, Image, TouchableOpacity, Modal } from "react-native"
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid"
import colors from "../assets/colors"
import { useState } from "react"
import Toast from "react-native-toast-message"
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon } from "react-native-heroicons/outline"
import { HandThumbUpIcon as HandThumbUpSolid } from "react-native-heroicons/solid"
import { trpc } from "@libs/trpc"
import { RouterOutput } from "types/user"
import { useNavigation } from "@react-navigation/native"
import { IUser } from "@kurakani/core"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Delete from "./Delete"
dayjs.extend(relativeTime)

type OutPost = RouterOutput["getFriendPost"]
interface PostProps {
    post: OutPost[0]
    user: IUser
}

export default function Post({ post, user }: PostProps) {
    const [status, setStatus] = useState({
        like: { count: post?.likes?.length ?? 0, state: post?.likes?.includes(user._id) },
        comment: { count: post?.comments?.length ?? 0 },
    })
    const { mutate: updateMutation } = trpc.updateLike.useMutation()
    const { isLoading, mutate: deleteMutation } = trpc.deletePostById.useMutation()
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const utils = trpc.useContext()

    const handleLike = async () => {
        setStatus((prev) => ({
            ...prev,
            like: {
                count: prev.like.state ? prev.like.count - 1 : prev.like.count + 1,
                state: !prev.like.state,
            },
        }))
        updateMutation({
            post_id: post._id,
        })
    }

    const handleDelete = async () => {
        deleteMutation(
            {
                postId: post._id,
            },
            {
                onSuccess: () => {
                    setVisible(false)
                    utils.getPostByUserId.invalidate()
                    utils.getFriendPost.invalidate()
                },
            },
        )
    }

    return (
        <View className="bg-gray-200 rounded-lg overflow-hidden p-4 my-3">
            {/* // Profile */}
            <View className="flex-row justify-between">
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                        onPress={() => {
                            // @ts-ignore
                            navigation.navigate("View Profile" as never, {
                                user: post.user_id,
                            })
                        }}
                    >
                        <Image
                            source={{
                                uri: post.user_id.profile_pic,
                            }}
                            className="w-10 h-10 rounded-full "
                            alt="Profile Image"
                        />
                    </TouchableOpacity>
                    <View>
                        <Text className="font-bold">{post.user_id.fullName}</Text>
                        <Text className="text-xs text-gray">{dayjs(post.createdAt).fromNow()}</Text>
                    </View>
                </View>
                {user._id === post.user_id._id && (
                    <EllipsisHorizontalIcon
                        color={colors.gray}
                        onPress={async () => {
                            setVisible(true)
                        }}
                    />
                )}
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
                    onPress={handleLike}
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
                <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => {
                        // @ts-ignore
                        navigation.navigate("Comment" as never, {
                            post,
                            user,
                        })
                    }}
                >
                    <ChatBubbleOvalLeftEllipsisIcon color={colors.primary} size={30} />
                    <Text className="font-bold text-sm px-1">
                        {post?.comments?.length} comment{post?.comments?.length > 0 && "s"}
                    </Text>
                </TouchableOpacity>
            </View>
            <Toast />
            <Modal visible={visible} transparent={true} animationType="slide">
                <Delete
                    setIsVisible={setVisible}
                    handleDelete={handleDelete}
                    isLoading={isLoading}
                />
            </Modal>
        </View>
    )
}
