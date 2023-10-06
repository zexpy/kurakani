import React from "react"
import { useCurrentUser } from "@hooks/useCurrentUser"
import AfterAuth from "./AfterAuth"
import BeforeAuth from "./BeforeAuth"
import { NavigationContainer } from "@react-navigation/native"
import VerifyProileStack from "./VerifyProfileStack"
import LottieView from "lottie-react-native"

const StackNavigator = () => {
    const { user, isLoading } = useCurrentUser()

    if (isLoading) {
        return (
            <LottieView
                source={require("../../assets/animation/Animation - 1696619036234.json")}
                autoPlay
                speed={2}
                loop={true}
            />
        )
    }

    return (
        <NavigationContainer>
            {!user ? (
                <BeforeAuth />
            ) : user?.fullName && user?.profile_pic ? (
                <AfterAuth />
            ) : (
                <VerifyProileStack />
            )}
        </NavigationContainer>
    )
}

export default StackNavigator
