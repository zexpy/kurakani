import Loading from "@components/Loading"
import { IUser } from "@kurakani/core"
import { trpc } from "@libs/trpc"
import { Image, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { RouterOutput } from "types/user"

type PhotosOutput = RouterOutput["getPhotoByUserId"]
const PhotoCard = ({ photo }: { photo: PhotosOutput[0] }) => {
    return (
        <Image
            source={{
                uri: photo.image,
            }}
            className=" h-32 w-32 m-1"
        />
    )
}

const Photos = ({ user }: { user: IUser }) => {
    const { isLoading, data } = trpc.getPhotoByUserId.useQuery(user._id.toString())

    if (isLoading) {
        return <Loading />
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row justify-center flex-wrap">
                {data.map((post) => {
                    if (!post.image) {
                        return
                    }
                    return <PhotoCard photo={post} />
                })}
            </View>
        </ScrollView>
    )
}

export default Photos
