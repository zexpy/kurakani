import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Chat from "../screens/Chat"
import Profile from "../screens/Profile"
import Main from "../screens/Main"
import colors from "../assets/colors"

import {
    ChatBubbleBottomCenterIcon,
    HomeIcon,
    PlusIcon,
    UserIcon,
} from "react-native-heroicons/outline"
import AddPost from "@screens/AddPost"

const Tab = createBottomTabNavigator()

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
            }}
        >
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <ChatBubbleBottomCenterIcon size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add Post"
                component={AddPost}
                options={{
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    tabBarIcon: ({ color, size }) => <PlusIcon size={size} color={color} />,
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <UserIcon size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    )
}
