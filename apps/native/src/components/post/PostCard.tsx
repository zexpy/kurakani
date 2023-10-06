import { Image, Text, View } from "react-native"
import type { IUser } from "@kurakani/core"
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon } from "react-native-heroicons/outline"
import { HandThumbUpIcon as HandThumbUpSolid } from "react-native-heroicons/solid"
import colors from "../../assets/colors"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useState } from "react"
import { RouterOutput } from "types/user"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

type PostByUserIdOutput = RouterOutput["getPostByUserId"]
interface IPostCard {
    user: IUser | null
    post: PostByUserIdOutput[0]
}
const PostCard = ({ user, post }: IPostCard) => {
    const [status, setStatus] = useState({
        like: false,
        comment: false,
    })

    return (
        <View className="p-4" key={post._id.toString()}>
            <View className="flex-row gap-3 items-center">
                <Image
                    source={{
                        uri: user.profile_pic,
                    }}
                    className="w-12 h-12 rounded-full"
                    alt="Profile Image"
                />
                <View>
                    <Text className="font-bold text-lg">{user.fullName}</Text>
                    <Text className="text-xs text-gray">{dayjs(post.createdAt).fromNow()}</Text>
                </View>
            </View>
            <View>
                <Text className="text-lg p-2">{post.content?.trim()}</Text>
                {Boolean(post.image) && (
                    <Image
                        source={{
                            uri: post.image,
                        }}
                        className="h-64 rounded-lg mb-2"
                    />
                )}
            </View>
            <View className="flex-row px-2 gap-2 mt-[1px] items-center">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center mx-6"
                    onPress={() => setStatus((prev) => ({ ...prev, like: !prev.like }))}
                >
                    {status.like ? (
                        <HandThumbUpSolid color={colors.primary} size={30} />
                    ) : (
                        <HandThumbUpIcon color={colors.gray} size={30} />
                    )}
                    <Text className="font-bold text-sm px-1"> {post.likes.length ?? 0} like</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center" onPress={() => {}}>
                    <ChatBubbleOvalLeftEllipsisIcon
                        color={status.comment ? colors.primary : colors.gray}
                        size={30}
                    />
                    <Text className="font-bold text-sm px-1">{post?.comments?.length} comment</Text>
                </TouchableOpacity>
            </View>
            <View className="border border-t-grayish opacity-20 mt-3" />
        </View>
    )
}

export default PostCard
