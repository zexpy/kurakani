import { zodResolver } from "@hookform/resolvers/zod"
import { useCurrentUser } from "@hooks/useCurrentUser"
import { IUpadateCreds, UpdateSchema } from "@kurakani/core"
import { trpc } from "@libs/trpc"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, TouchableOpacity, View, Text, TextInput } from "react-native"
import { Toast } from "react-native-toast-message/lib/src/Toast"

interface UpdateProfileProps {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const UpdateProfile = ({ setIsVisible }: UpdateProfileProps) => {
    const { user, setUser } = useCurrentUser()
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<IUpadateCreds>({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            address: user?.address,
        },
        resolver: zodResolver(UpdateSchema),
    })

    const { isLoading, mutate: updateProfileMutation } = trpc.updateUser.useMutation()

    console.log(user)
    const updateSubmit = (data: Record<string, any>) => {
        updateProfileMutation(
            {
                update: data,
            },
            {
                onSuccess: (response) => {
                    // @ts-ignore
                    setUser(response)
                    setIsVisible(false)
                },
            },
        )
    }
    return (
        <View className="flex-1 justify-end items-center">
            <View className="bg-white h-72 w-full rounded-lg p-4">
                <View>
                    <View className="flex-row py-3 justify-between">
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    placeholder="First Name"
                                    value={value}
                                    onChangeText={onChange}
                                    className={`border-[1px] ${
                                        errors.firstName ? "border-red" : "border-gray-300"
                                    } p-2 rounded-lg w-44`}
                                />
                            )}
                            name="firstName"
                        />
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    value={value}
                                    placeholder="Last Name"
                                    onChangeText={onChange}
                                    className={`border-[1px] ${
                                        errors.lastName ? "border-red" : "border-gray-300"
                                    } p-2 rounded-lg w-44`}
                                />
                            )}
                            name="lastName"
                        />
                    </View>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                placeholder="Email"
                                onChangeText={onChange}
                                className={`border-[1px] ${
                                    errors.email ? "border-red" : "border-gray-300"
                                } p-2 rounded-lg`}
                            />
                        )}
                        name="email"
                    />
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                placeholder="City, Country"
                                onChangeText={onChange}
                                keyboardType="email-address"
                                className={`border-[1px] ${
                                    errors.address ? "border-red" : "border-gray-300"
                                }  p-2 rounded-lg text-sm mt-4`}
                            />
                        )}
                        name="address"
                    />
                    <View className="flex-row items-center gap-x-4">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            disabled={!isDirty}
                            className={`mt-4 ${
                                isDirty ? "bg-primary" : "bg-gray-600"
                            } w-28 rounded-md`}
                            onPress={handleSubmit(updateSubmit)}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" className="py-2" />
                            ) : (
                                <Text className="text-center text-white font-bold py-2">
                                    Update
                                </Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className={`mt-4 bg-rose-500 w-28 rounded-md`}
                            onPress={() => setIsVisible(false)}
                        >
                            {false ? (
                                <ActivityIndicator size="small" color="white" className="py-2" />
                            ) : (
                                <Text className="text-center text-white font-bold py-2">
                                    Cancel
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Toast />
        </View>
    )
}

export default UpdateProfile
