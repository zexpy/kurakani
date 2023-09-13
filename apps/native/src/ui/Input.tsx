import {
    TextInput,
    TextInputProps,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline'

interface InputComponentprops extends TextInputProps {
    label: string
    secure?: boolean
    control: any
    name: string
    error?: string
}

const Input = ({
    label,
    secure,
    control,
    name,
    error,
    ...props
}: InputComponentprops) => {
    const { field } = useController({
        control,
        defaultValue: '',
        name,
    })
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <View className="flex-col space-y-1">
            <TextInput
                value={field.value}
                className={`px-4 py-2 border-[1px]  ${
                    error ? 'border-red' : 'border-gray-300'
                } rounded-md text-grayText text-sm mt-3`}
                placeholder={label}
                secureTextEntry={secure && !isPasswordVisible}
                onChangeText={field.onChange}
                {...props}
            />
            {['password', 'confirmPassword'].includes(name) && (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                        <EyeIcon
                            size={25}
                            color="gray"
                            style={{
                                position: 'absolute',
                                right: 15,
                                top: -38,
                            }}
                        />
                    ) : (
                        <EyeSlashIcon
                            size={25}
                            color="gray"
                            style={{
                                position: 'absolute',
                                right: 15,
                                top: -38,
                            }}
                        />
                    )}
                </TouchableOpacity>
            )}
            {error ? (
                <Text className="text-xs text-red ml-1 mt-1">{error}</Text>
            ) : null}
        </View>
    )
}

export default Input
