import {
  Text,
  Pressable,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ISignUpCreds, SignUpSchema } from "@kurakani/core";
import { trpc } from "@libs/trpc";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const { mutate: signUpWithEmail, isLoading } =
    trpc.registerUser.useMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpCreds>({
    resolver: zodResolver(SignUpSchema),
  });
  // WHY ARE WE USING IT HERE
  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     console.log(token);
  //   };
  //   getToken();
  // }, []);

  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("login" as never);
  };
  const handleSignUp = async (data: ISignUpCreds) => {
    if (!data) return;
    signUpWithEmail(data, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Signed up successfully",
        });
        navigation.navigate("login" as never);
      },
      onError: (err) => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: err.message,
        });
      },
    });
  };

  return (
    <SafeAreaView>
      <ScrollView className="p-5 bg-[#FFFF] h-screen">
        <Image
          source={require("../../assets/signup.png")}
          className="h-56 w-56 mx-auto "
        />

        <Card>
          <Text className="text-2xl font-bold opacity-60">Sign up</Text>
          <Input
            label="Username"
            control={control}
            name="username"
            error={errors.username?.message}
          />
          <Input
            label="Email"
            control={control}
            name="email"
            error={errors.email?.message}
          />
          <Input
            label="Password"
            secure={true}
            name="password"
            control={control}
            error={errors.password?.message}
          />
          <Input
            label="Confirm your password"
            secure={true}
            name="confirmPassword"
            control={control}
            error={errors.confirmPassword?.message}
          />
          <Button className="mt-3" onPress={handleSubmit(handleSignUp)}>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text className="text-center text-white font-bold py-2">
                Sign up
              </Text>
            )}
          </Button>
        </Card>
        <View className="flex-row items-center mt-2 mx-auto">
          <Text className="text-sm opacity-60 text-center ">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={handleNavigate}>
            <Text className="text-sm opacity-60 text-center text-primary font-bold">
              Login Now
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
