import { trpc } from "@libs/trpc";
import { useState } from "react";
import Box from "@components/Box";
import Loading from "@components/Loading";
import FriendCard from "../ui/FriendCard";
import { FlatList, Text } from "react-native";
import { RouterOutput } from "types/user";
import { useNavigation } from "@react-navigation/native";

type OutPut = RouterOutput["getAllUser"];
const FriendSection = () => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState<
    "Friends" | "Friends Request"
  >("Friends");

  const [peoples, setPeoples] = useState<OutPut>([]);

  const { isLoading, data } = trpc.getAllUser.useQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <Text className="text-lg font-bold">Friends</Text>
      <FlatList
        className="h-[92vh]"
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <FriendCard
            name={item.username}
            email={item.email}
            btnLabel="Message"
            handleSubmit={() =>
              // @ts-ignore
              navigation.navigate("MessageChat" as never, { user: item })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default FriendSection;
