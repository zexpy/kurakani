import {
    Button,
    Card,
    H2,
    Image,
    Paragraph,
    View,
    XStack,
    YStack,
} from 'tamagui'
import { useFonts } from 'expo-font'
import Box from '@components/Box'
import { Avatar } from 'tamagui'

export default function Profile() {
    const [loaded] = useFonts({
        Inter: require('./Inter-Medium.ttf'),
    })

    if (!loaded) {
        return null
    }

    return (
        <Box>
            <XStack alignItems="center" space="$6" justifyContent="center">
                <Avatar circular size="$10">
                    <Avatar.Image
                        accessibilityLabel="Cam"
                        src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                    />
                    <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>

                <Avatar circular size="$8">
                    <Avatar.Image
                        accessibilityLabel="Nate Wienert"
                        src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                    />
                    <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
                </Avatar>
            </XStack>
        </Box>
    )
}
