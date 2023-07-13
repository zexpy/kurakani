import { FlatList, Text, View } from 'react-native'
import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from 'react-native-heroicons/outline'
import Box from '@components/Box'
import MessageProfile from '@components/chat/MessageProfile'
import { faker } from '@faker-js/faker'

export default function Chat() {
    return (
        <Box>
            <View className="p-2 flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <Text className="font-bold text-2xl">Messages</Text>
                    <ChevronDownIcon size={24} color="black" />
                </View>
                <MagnifyingGlassIcon size={24} color="black" />
            </View>
            <FlatList
                data={Array.from(Array(20))}
                renderItem={() => (
                    <MessageProfile
                        user={{
                            fullName: faker.person.fullName(),
                            avatar: faker.image.avatarLegacy(),
                        }}
                        message={faker.lorem.words()}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </Box>
    )
}
