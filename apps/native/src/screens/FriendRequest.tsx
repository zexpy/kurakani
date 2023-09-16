import Loading from "@components/Loading";
import { trpc } from "@libs/trpc";
import { Image, Text, TouchableOpacity, View } from "react-native";

const FriendRequest = ({ route }) => {
  const utils = trpc.useContext();
  const user = route.params.user;
  const { isLoading, data } = trpc.getFriendRequestById.useQuery(
    user._id.toString()
  );
  const { mutate: handleRequest } = trpc.updateRequest.useMutation();

  if (isLoading) {
    return <Loading />;
  }

  const acceptRequest = (id: string) => {
    handleRequest(
      {
        sender_id: id,
        receiver_id: user._id,
        status: "accepted",
      },
      {
        onSuccess: () => {
          utils.getFriendRequestById.invalidate();
          utils.getFriendById.invalidate();
        },
      }
    );
  };

  const deleteRequest = (id: string) => {
    handleRequest(
      {
        sender_id: id,
        receiver_id: user._id,
        status: "rejected",
      },
      {
        onSuccess: () => {
          utils.getFriendRequestById.invalidate();
        },
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex justify-between items-center">
      {data.map((people) => {
        return (
          // @ts-ignore
          <View
            className="p-3 m-2 bg-gray-200 rounded-md shadow-2xl"
            key={people._id.toString()}
          >
            <View className="flex flex-row items-center gap-3 justify-center">
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                }}
                className="h-20 w-20"
              />
              <View>
                <Text className="font-bold py-1 text-lg">
                  {
                    // @ts-ignore
                    people.sender_id.username
                  }
                </Text>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-primary rounded-md py-2 w-32"
                    // @ts-ignore
                    onPress={() => acceptRequest(people.sender_id._id)}
                  >
                    <Text className="text-center text-white font-bold">
                      Confirm
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-gray-600 rounded-md py-2 w-32"
                    // @ts-ignore
                    onPress={() => deleteRequest(people.sender_id._id)}
                  >
                    <Text className="text-center text-white font-bold">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default FriendRequest;
