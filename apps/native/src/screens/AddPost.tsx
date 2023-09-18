import Box from "@components/Box"
import { useCurrentUser } from "@hooks/useCurrentUser"
import { handleUploadImage } from "../helper/imagePicker"
import { handleUploadCloudinary } from "../helper/uploadPhoto"
import { useState } from "react"
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import { PhotoIcon, UserIcon } from "react-native-heroicons/outline"
import { trpc } from "@libs/trpc"
import { Toast } from "react-native-toast-message/lib/src/Toast"

const AddPost = ({ navigation }) => {
    const utils = trpc.useContext()
    const { user } = useCurrentUser()
    const [text, setText] = useState<string>()
    const [placeholder, setPlaceHolder] = useState<string>("What's on your mind?")
    const [image, setImage] = useState<string>()

    const { isLoading, mutate: mutatePost } = trpc.addPost.useMutation()

    const handleSubmit = () => {
        if (!image && !text) {
            return
        }
        mutatePost(
            {
                image,
                content: text,
                user_id: user._id.toString(),
            },
            {
                onSuccess: () => {
                    setText(undefined)
                    setImage(undefined)
                    setPlaceHolder("What's on your mind?")
                    navigation.goBack()
                    utils.getPostByUserId.invalidate()
                    Toast.show({
                        type: "success",
                        text1: "Post upload",
                        text2: "Successfully",
                    })
                },
            },
        )
    }
    return (
        <Box>
            <View className="flex-row gap-3 item-center">
                <Image
                    source={{
                        uri: user.profile_pic,
                    }}
                    className="h-14 w-14 rounded-full"
                />
                <View className="py-[1]">
                    <Text className="font-bold text-lg item-center">{user.fullName}</Text>
                    <View className=" flex-row bg-primary p-1 rounded-lg items-center w-24">
                        <UserIcon color="white" size={15} />
                        <Text className="px-2 text-white">Friends</Text>
                    </View>
                </View>
            </View>
            <View className="py-3 h-full">
                <TextInput
                    placeholder={placeholder}
                    className={`${
                        !image ? "h-40" : "h-20"
                    } p-3 text-lg text-grayish bg-gray-100 rounded-lg`}
                    textAlignVertical="top"
                    style={{ fontSize: 20 }}
                    multiline={true}
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={setText}
                />
                {Boolean(image) && (
                    <Image
                        source={{
                            uri: image,
                        }}
                        className="h-3/6 w-full mb-2"
                    />
                )}
                <TouchableOpacity
                    onPress={async () => {
                        const result = await handleUploadImage()
                        setImage(result.assets[0].uri)
                        setPlaceHolder("Say something about this photo...")
                        const v2 = await handleUploadCloudinary({
                            uri: result.assets[0].uri,
                            type: `post/${result.assets[0].uri.split(".")[1]}`,
                            name: `post.${Date.now()}.${result.assets[0].uri.split(".")[1]}`,
                        })
                        setImage(v2.secure_url)
                    }}
                    className="my-3"
                >
                    <View className="border-y border-[#ccc] py-1 flex-row items-center mt-2">
                        <PhotoIcon size={30} color="gray" />
                        <Text className="px-2 text-[15px] text-grayish">Photo/Video</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`${
                        !image && !text ? "bg-gray-600" : "bg-primary"
                    } p-2 w-24 rounded-lg`}
                    onPress={handleSubmit}
                    activeOpacity={0.8}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text className="text-white text-center font-bold">Add Post</Text>
                    )}
                </TouchableOpacity>
            </View>
        </Box>
    )
}

export default AddPost
