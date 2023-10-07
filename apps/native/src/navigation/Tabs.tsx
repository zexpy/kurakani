import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Chat from "../screens/Chat"
import Profile from "../screens/Profile"
import Main from "../screens/Main"
import colors from "../assets/colors"
import React from "react"
import {
    ChatBubbleBottomCenterIcon,
    HomeIcon,
    PlusIcon,
    UserIcon,
} from "react-native-heroicons/outline"
import AddPost from "@screens/AddPost"
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator()

export default function Tabs() {
    return (
        <Tab.Navigator
        //   @ts-ignore 
            tabBarOptions={{
                showLabel:false,
                style: {
                    position:"absolute",
                    buttom:25,
                    left:20,
                    right:20,
                    elevation:0,
                    backgroundColor:"#ffffff",
                    borderRadius:15,
                    height:90,
                    ...styles.shadow
                }
            }}
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarStyle: [
                    {
                      display: "flex"
                    },
                    null
                  ]
               
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

const styles = StyleSheet.create(
    {
        shadow : {
            shadowColor:"#7F5DF0",
            shadowOffset: {
                width:0,
                height:10
            },
            shadowOpacity:0.25,
            shadowRadius:3.5,
            elevation:5
        }
    }
)
