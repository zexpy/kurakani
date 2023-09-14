import React from "react";
import { useCurrentUser } from "@hooks/useCurrentUser";
import AfterAuth from "./AfterAuth";
import BeforeAuth from "./BeforeAuth";
import { ActivityIndicator, View } from "react-native";
import colors from "../assets/colors";
import { NavigationContainer } from "@react-navigation/native";

const StackNavigator = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AfterAuth /> : <BeforeAuth />}
    </NavigationContainer>
  );
};

export default StackNavigator;
