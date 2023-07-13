import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface BoxProps {
    children: React.ReactNode
}

const Box: React.FC<BoxProps> = ({ children }) => {
    return (
        <SafeAreaView>
            <View className="p-6">{children}</View>
        </SafeAreaView>
    )
}

export default Box
