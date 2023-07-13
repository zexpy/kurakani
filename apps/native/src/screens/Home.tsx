import { FlatList, Text, View } from 'react-native'
import Box from '@components/Box'
import Post from '@components/Post'
import { faker } from '@faker-js/faker'

export enum ContentType {
    TEXT = 'text',
    IMAGE = 'image',
}

export default function Home() {
    return (
        <Box>
            <View>
                <Text className="text-xl font-bold">Latest Posts</Text>
                {/* <Story /> */}
                <FlatList
                    data={Array.from(Array(10))}
                    renderItem={() => (
                        <Post
                            name={faker.person.fullName()}
                            avatar={faker.image.avatarLegacy()}
                            description={faker.lorem.sentences()}
                            contentType={ContentType.IMAGE}
                            imageUrl={faker.image.url()}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Box>
    )
}
