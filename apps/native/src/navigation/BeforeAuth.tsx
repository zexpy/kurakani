import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "@screens/Login"
import Signup from "@screens/SignUp"
import Toast from "react-native-toast-message"

const Stack = createNativeStackNavigator()
const BeforeAuth = () => {
    return (
        <>
            <Stack.Navigator>
                {/* <Stack.Screen
            name="onboarding"
            component={OnBoarding}
            options={{
              headerShown: false,
            }}
          /> */}

                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="signup"
                    component={Signup}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
            <Toast position="top" />
        </>
    )
}

export default BeforeAuth
