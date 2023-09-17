import { Text, Pressable, View, ActivityIndicator, Image } from "react-native";

interface IFriendCardProps {
  isLoading?: boolean;
  name: string;
  email: string;
  profile_pic: string;
  btnLabel?: string;
  handleSubmit?: () => void;
}
const FriendCard = ({
  isLoading,
  name,
  email,
  profile_pic,
  btnLabel,
  handleSubmit,
}: IFriendCardProps) => {
  return (
    <View className="my-2 flex-row justify-between items-center p-3 bg-gray-200 rounded-md shadow-2xl">
      <View className={`flex flex-row items-center gap-3`}>
        <Image
          source={{
            uri: profile_pic,
          }}
          className="h-14 w-14 rounded-full"
        />
        <View>
          <Text className="font-bold">{name}</Text>
          <Text className="text-xs text-gray py-[1]">{email}</Text>
        </View>
      </View>
      {btnLabel && (
        <Pressable
          className="bg-primary w-24 rounded-md py-2"
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-center text-white font-bold">{btnLabel}</Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default FriendCard;
