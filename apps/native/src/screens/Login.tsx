import { Text, Pressable, View, ActivityIndicator, ScrollView, Image } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ILoginCreds, LoginSchema, TokenProvider, useUserStore } from "@kurakani/core"
import { Toast } from "react-native-toast-message/lib/src/Toast"
import Card from "../ui/Card"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { trpc } from "@libs/trpc"

const Login = () => {
    const { isLoading, mutate: loginWithEmail } = trpc.loginUser.useMutation()
    const setUser = useUserStore((state) => state.setUser)

    const navigation = useNavigation()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginCreds>({
        resolver: zodResolver(LoginSchema),
    })

    const handleNavigateSignup = () => {
        navigation.navigate("signup" as never)
    }

    const handleLogin = (data: ILoginCreds) => {
        loginWithEmail(data, {
            onSuccess: async (user) => {
                // @ts-ignore
                setUser(user.user)
                await TokenProvider.setItem("user", JSON.stringify(user))

                Toast.show({
                    type: "success",
                    visibilityTime: 700,
                    text1: "Success",
                    text2: "Logged in successfully",
                })
            },
            onError: (err) => {
                Toast.show({
                    type: "error",
                    text1: "Oops!",
                    text2: err.message,
                })
            },
        })
    }

    return (
        <SafeAreaView>
            <ScrollView className="bg-[#FFFFFF] h-screen p-5 pt-20 ">
                <Image source={require("../../assets/login.png")} className="h-56 w-56 mx-auto " />
                <Card>
                    <Text className="text-2xl font-bold opacity-60">Login</Text>
                    <Input
                        label="Email"
                        control={control}
                        name="email"
                        error={errors.email?.message}
                    />
                    <Input
                        label="Password"
                        name="password"
                        secure={true}
                        control={control}
                        error={errors.password?.message}
                    />
                    <Pressable className="my-2">
                        <Text className="text-sm text-gray-400 ml-1 font-bold mx-2">
                            Forgot Password?
                        </Text>
                    </Pressable>
                    <Button className="mt-1 mb-2" onPress={handleSubmit(handleLogin)}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="white" />
                        ) : (
                            <Text className="text-center text-white font-bold py-2">Login</Text>
                        )}
                    </Button>
                </Card>
                <View className="flex-row items-center mx-auto">
                    <Text className="text-sm opacity-60 text-center ">New to Kurakani? </Text>
                    <Pressable onPress={handleNavigateSignup}>
                        <Text className="text-sm opacity-60 text-center text-primary font-bold">
                            Sign up Now
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login
