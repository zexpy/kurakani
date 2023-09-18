import * as ImagePicker from "expo-image-picker"

export const handleUploadImage = async () => {
    try {
        await ImagePicker.requestMediaLibraryPermissionsAsync()
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        })
        return result
    } catch (error) {
        console.log(error)
    }
}
