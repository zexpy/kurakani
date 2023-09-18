import { CLOUDINARY_API, UPLOAD_PRESET, CLOUD_NAME } from "@env"

export const handleUploadCloudinary = async (image: any) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", UPLOAD_PRESET)
    formData.append("cloud_name", CLOUD_NAME)
    try {
        const response = await fetch(CLOUDINARY_API, {
            method: "POST",
            body: formData,
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
