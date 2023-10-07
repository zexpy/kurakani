import { createDrawerNavigator } from "@react-navigation/drawer"
import FriendRequest from "@screens/FriendRequest"
import Tabs from "./Tabs"
import CustomDrawer from "@screens/CustomDrawer"
import { AdjustmentsHorizontalIcon, HomeIcon, UsersIcon } from "react-native-heroicons/outline"
import colors from "../assets/colors"
import Toast from "react-native-toast-message"
import FriendSection from "@screens/FriendSection"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "@screens/Main"
import AddPost from "@screens/AddPost"
import Profile from "@screens/Profile"
import Chat from "@screens/Chat"

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator();



const DrawerStack = () => {
    return (
        <>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: colors.primary,
                    drawerActiveTintColor: "#fff",
                    drawerInactiveTintColor: "#333",
                    drawerLabelStyle: { marginLeft: -15 },
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={Tabs}
                    options={{
                        drawerIcon: ({ color }) => <HomeIcon size={22} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="Friends"
                    component={FriendSection}
                    options={{
                        drawerIcon: ({ color }) => <UsersIcon size={22} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={FriendRequest}
                    options={{
                        drawerIcon: ({ color }) => (
                            <AdjustmentsHorizontalIcon size={22} color={color} />
                        ),
                    }}
                />
            </Drawer.Navigator>
            <Toast position="top" />
            
        </>
    )
}

export default DrawerStack
