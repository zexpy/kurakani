import React from "react"
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { ExclamationTriangleIcon } from "react-native-heroicons/solid"

interface DeleteProps {
    handleDelete: () => void
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean
}
const Delete = ({ handleDelete, setIsVisible, isLoading }: DeleteProps) => {
    return (
        <View className="flex-1 justify-end items-center">
            <View className="bg-white h-72 w-full rounded-lg p-4">
                <View className="flex justify-center items-center">
                    <ExclamationTriangleIcon size={50} color="red" />
                    <Text className="leading-10 text-lg font-medium">Are you sure?</Text>
                    <Text className="leading-7">This action cannot be undone. All values</Text>
                    <Text className="leadin-7">associated with this field will be lost</Text>
                </View>
                <View className="p-2 items-center">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-rose-500 rounded-md p-3 w-[90%] my-2"
                        onPress={handleDelete}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text className="text-white text-center">Delete it</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-primary rounded-md p-3 w-[90%] my-2"
                        onPress={() => {
                            setIsVisible(false)
                        }}
                    >
                        <Text className="text-white text-center">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Delete
