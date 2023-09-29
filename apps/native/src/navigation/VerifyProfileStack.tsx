import { createNativeStackNavigator } from "@react-navigation/native-stack"
import VerifyProfile from "@screens/VerifyProfile"
import colors from "../assets/colors"

const Stack = createNativeStackNavigator()
const VerifyProileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Verify Profile"
                component={VerifyProfile}
                options={{
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default VerifyProileStack
