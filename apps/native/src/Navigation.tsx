import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Tabs from "./Tabs";
import Message from "@components/chat/Message";
import SignUp from "@screens/SignUp";
import OnBoarding from "@screens/OnBoarding";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useCurrentUser } from "@hooks/useCurrentUser";

const Stack = createNativeStackNavigator();
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
      <Toast position="top" />
    </NavigationContainer>
  );
};

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
      <Toast position="top" />
    </NavigationContainer>
  );
};

const StackNavigator = () => {
  const { user } = useCurrentUser();
  if (user) {
    return <AfterAuth />;
  }
  return <BeforeAuth />;
};

export default StackNavigator;
