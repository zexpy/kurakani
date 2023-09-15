import Box from "@components/Box";
import Loading from "@components/Loading";
import { trpc } from "@libs/trpc";
import FriendCard from "../ui/FriendCard";
import { FlatList, Text } from "react-native";

const AddFriend = () => {
  const { isLoading, data } = trpc.getAllUser.useQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <Text className="text-lg font-bold">People you may know </Text>
      <FlatList
        className="h-[92vh]"
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <FriendCard
            name={item.username}
            email={item.email}
            btnLabel="Add Friend"
            handleSubmit={() => {}}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default AddFriend;
