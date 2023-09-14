import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import Message from "@components/chat/Message";
import DrawerStack from "./DrawerStack";

const Stack = createNativeStackNavigator();
const AfterAuth = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Parent"
          component={DrawerStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="MessageChat" component={Message} />
      </Stack.Navigator>
      <Toast position="top" />
    </>
  );
};

export default AfterAuth;
