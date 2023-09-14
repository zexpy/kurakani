import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";
import colors from "../assets/colors";
import { TokenProvider, useUserStore } from "@kurakani/core";
import Toast from "react-native-toast-message";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const setUser = useUserStore((state) => state.setUser);
  return (
    <View className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: colors.primary }}
      >
        <ImageBackground
          source={require("../../assets/signup.png")}
          className="p-4"
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            className="h-10 w-10 rounded-[40] mt-20"
          />
          <View className="flex flex-row"></View>
        </ImageBackground>
        <View className="flex-1 bg-[#fff] pt-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={async () => {
          await TokenProvider.removeItem("user");
          setUser(null);
          Toast.show({
            type: "success",
            text1: "Logout",
            text2: "Logout Successfully!",
            visibilityTime: 700,
          });
        }}
        className="p-5 border-t border-[#ccc]"
      >
        <View className="flex flex-row gap-3 items-center">
          <ArrowLeftOnRectangleIcon size={22} color={colors.primary} />
          <Text className="text-md font-medium">Sign Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;
