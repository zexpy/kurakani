import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import Tabs from './Tabs'
import Message from '@components/chat/Message'
import { useCurrentUser } from '@kurakani/core'
import SignUp from '@screens/SignUp'
import OnBoarding from '@screens/OnBoarding'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()
const AfterAuth = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={Tabs}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="message-chat" component={Message} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const BeforeAuth = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="onboarding"
                    component={OnBoarding}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="signup"
                    component={SignUp}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const StackNavigator = () => {
    const [isLaunched, setIsLaunched] = useState<boolean>(false)

    useEffect(() => {
        AsyncStorage.getItem('launched').then(val => {
            if (!val) {
                AsyncStorage.setItem('launched', 'true')
                setIsLaunched(true)
                return
            }
        })
    }, [])

    const { isAuthenticated } = useCurrentUser()
    if (isAuthenticated) {
        return <AfterAuth />
    }
    return <BeforeAuth />
}

export default StackNavigator
