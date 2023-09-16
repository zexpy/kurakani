import Loading from "@components/Loading";
import { trpc } from "@libs/trpc";
import { FlatList, Text, View } from "react-native";
import FriendCard from "../ui/FriendCard";
import Toast from "react-native-toast-message";

const SuggestFriend = ({ route }) => {
  const utils = trpc.useContext();
  const user = route.params.user;
  const { isLoading, data } = trpc.getAllUser.useQuery();

  const { mutate: handleAdd } = trpc.addFriend.useMutation();

  if (isLoading) {
    return <Loading />;
  }
  const handleAddFriend = (id: string) => {
    handleAdd(
      {
        sender_id: user._id,
        receiver_id: id,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Added",
            text2: "Successfully",
          });
        },
      }
    );
  };

  return (
    <View className="p-4">
      <Text className="text-lg font-bold">People you may know</Text>
      <FlatList
        className="h-[92vh]"
        data={data}
        // @ts-ignore
        keyExtractor={(item) => item?._id.toString()}
        renderItem={({ item }) => {
          return (
            <FriendCard
              // @ts-ignore
              name={item.username}
              // @ts-ignore
              email={item.email}
              btnLabel="Add"
              handleSubmit={() => handleAddFriend(item._id.toString())}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SuggestFriend;
