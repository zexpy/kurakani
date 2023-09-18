import { Image, Text } from "react-native"
import Box from "@components/Box"
import { useCurrentUser } from "@hooks/useCurrentUser"
import { MapPinIcon } from "react-native-heroicons/outline"
import { useState } from "react"
import { View, useWindowDimensions } from "react-native"
import { TabView, SceneMap } from "react-native-tab-view"
const FirstRoute = () => <View style={{ flex: 1, backgroundColor: "#ff4081" }} />

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />

const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: "#727281" }} />

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
})

export default function Profile() {
    const { user } = useCurrentUser()
    const layout = useWindowDimensions()

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: "first", title: "Posts" },
        { key: "second", title: "Photos" },
        { key: "third", title: "Friends" },
    ])
    return (
        <>
            <View className="flex-row items-center gap-3 py-2">
                <Image
                    source={{
                        uri: user.profile_pic,
                    }}
                    className="h-20 w-20 rounded-full"
                />
                <View>
                    <Text className="text-xl font-bold">{user.fullName}</Text>
                    <Text className="text-grayish">@{user.username}</Text>
                    <View className="flex-row items-center pt-[1px]">
                        <MapPinIcon size={15} color="black" />
                        <Text>{user.address}</Text>
                    </View>
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                animationEnabled={true}
                initialLayout={{ width: layout.width }}
            />
        </>
    )
}
