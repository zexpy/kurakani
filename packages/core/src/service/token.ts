import AsyncStorage from "@react-native-async-storage/async-storage"

class TokenService {
    setItem = async (key: string, value: string) => {
        await AsyncStorage.setItem(key, value)
    }

    getItem = async (key: string) => {
        const value = await AsyncStorage.getItem(key)
        return value
    }

    removeItem = async (key: string) => {
        await AsyncStorage.removeItem(key)
    }
}
const TokenProvider = new TokenService()
export { TokenProvider }
