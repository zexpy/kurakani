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
import Button from "../ui/Button";
import { trpc } from "@libs/trpc";

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

  const { isLoading: updateLoading, mutate } = trpc.verifyProfile.useMutation();

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

  return (
    <View className="m-12 flex justify-center items-center">
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }}
        className="h-40 w-40"
      />

      <View>
        <View className="pt-6 flex-row gap-4 mb-4">
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
                    errors?.firstName ? "border-red" : "border-gray-300"
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
