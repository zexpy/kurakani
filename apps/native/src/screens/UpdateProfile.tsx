import Loading from "@components/Loading";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { IUpadateCreds, UpdateSchema } from "@kurakani/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../assets/colors";
import { useForm, Controller } from "react-hook-form";
import { ActivityIndicator, Text, TextInput } from "react-native";
import { Image, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { TouchableOpacity } from "react-native";
import { trpc } from "@libs/trpc";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const VerifyProileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Verify Profile"
        component={UpdateProfile}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const UpdateProfile = () => {
  const { user, setUser, isLoading } = useCurrentUser();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IUpadateCreds>({
    defaultValues: user,
    resolver: zodResolver(UpdateSchema),
  });

  const [image, setImage] = useState<string>(user?.profile_pic);
  const { isLoading: updateLoading, mutate } = trpc.verifyProfile.useMutation();
  const { mutate: uploadImageMutate } = trpc.updateUser.useMutation();

  if (isLoading) {
    return <Loading />;
  }

  const updateSubmit = (data: IUpadateCreds) => {
    mutate(
      {
        id: user._id.toString(),
        update: data,
      },
      {
        onSuccess: (data) => {
          // @ts-ignore
          setUser(data);
        },
      }
    );
  };

  const hanleUploadCloudinary = async (image: any) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.UPLOAD_PRESET);
    formData.append("cloud_name", process.env.CLOUD_NAME);
    try {
      const response = await fetch(process.env.CLOUDINARY_API, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      uploadImageMutate(
        {
          id: user._id.toString(),
          update: {
            profile_pic: data.secure_url,
          },
        },
        {
          onSuccess: () => {
            //TODO: IF NEEDED: setUser(result)
            setImage(data.secure_url);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async () => {
    try {
      // const permissions =
      //   await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.canceled) {
        await hanleUploadCloudinary({
          uri: result.assets[0].uri,
          type: `profile/${result.assets[0].uri.split(".")[1]}`,
          name: `profile.${Date.now()}.${result.assets[0].uri.split(".")[1]}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="m-12 flex justify-center items-center">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleUploadImage}
        className="bg-gray-300 rounded-full"
      >
        <Image
          style={{
            borderWidth: 0.5,
          }}
          alt="UPLOAD IMAGE"
          source={{
            uri: image,
          }}
          className={`h-40 w-40 rounded-full`}
        />
      </TouchableOpacity>
      <Text className="mt-2 text-xl font-bold">Upload Image</Text>
      <View>
        <View className="pt-4 flex-row gap-4 mb-4">
          <View>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="First Name"
                  value={value}
                  onChangeText={onChange}
                  editable={user.lastName ? false : true}
                  className={`border-[1px] ${
                    errors.firstName ? "border-red" : "border-gray-300"
                  } p-2 w-40 rounded-lg text-grayish`}
                />
              )}
              name="firstName"
            />
          </View>
          <View>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  placeholder="Last Name"
                  onChangeText={onChange}
                  editable={user.lastName ? false : true}
                  className={`border-[1px] ${
                    errors.lastName ? "border-red" : "border-gray-300"
                  } p-2 w-40 rounded-lg text-grayish`}
                />
              )}
              name="lastName"
            />
          </View>
        </View>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              placeholder="Email"
              onChangeText={onChange}
              editable={value ? false : true}
              className={`border-[1px] ${
                errors.email ? "border-red" : "border-gray-300"
              } p-2 rounded-lg text-grayish`}
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
              }  p-2 rounded-lg text-grayish text-sm mt-4`}
            />
          )}
          name="address"
        />
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isDirty}
          className={`mt-4 ${
            isDirty ? "bg-primary" : "bg-gray-600"
          } w-36 rounded-md`}
          onPress={handleSubmit(updateSubmit)}
        >
          {updateLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text className="text-center text-white font-bold py-2">
              Update Profile
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyProileStack;
