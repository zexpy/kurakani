import React from "react";
import { useCurrentUser } from "@hooks/useCurrentUser";
import AfterAuth from "./AfterAuth";
import BeforeAuth from "./BeforeAuth";
import { ActivityIndicator, View } from "react-native";
import colors from "../assets/colors";
import { NavigationContainer } from "@react-navigation/native";
import VerifyProileStack from "@screens/UpdateProfile";

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
      {!user ? (
        <BeforeAuth />
      ) : user?.fullName && user?.profile_pic ? (
        <AfterAuth />
      ) : (
        <VerifyProileStack />
      )}
    </NavigationContainer>
  );
};

export default StackNavigator;
