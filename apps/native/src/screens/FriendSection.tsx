import Box from "@components/Box";
import Loading from "@components/Loading";
import { trpc } from "@libs/trpc";
import FriendCard from "../ui/FriendCard";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useNavigation } from "@react-navigation/native";

const FriendSection = () => {
  const { user } = useCurrentUser();
  const { isLoading, data } = trpc.getFriendById.useQuery(user._id?.toString());
  const [inputSearch, setInputSearch] = useState<string>();
  const navigation = useNavigation();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <Text className="text-lg font-bold mb-1">Friends</Text>
      <View className="flex-row gap-3">
        <Pressable
          className="bg-primary p-2 rounded-xl"
          onPress={() =>
            // @ts-ignore
            navigation.navigate("Suggestion" as never, { user })
          }
        >
          <Text className="text-white">Suggestions</Text>
        </Pressable>
        <Pressable
          className="bg-primary p-2 rounded-xl"
          onPress={() =>
            // @ts-ignore
            navigation.navigate("Friend Request" as never, { user })
          }
        >
          <Text className="text-white">Friend Requests</Text>
        </Pressable>
      </View>
      <View className=" mt-3 border-t border-[#ccc]"></View>
      {data.friends.length > 0 ? (
        <View>
          <TextInput
            className="mt-3 p-2 border rounded-md border-[#ccc]"
            value={inputSearch}
            onChangeText={setInputSearch}
            placeholder="Search Friends"
          />
          <FlatList
            className="h-[92vh] mt-2"
            data={data.friends}
            // @ts-ignore
            keyExtractor={(item) => item?._id.toString()}
            renderItem={({ item }) => {
              if (
                inputSearch &&
                // @ts-ignore
                !item?.username
                  .toUpperCase()
                  .includes(inputSearch.trim().toUpperCase())
              ) {
                return (
                  <View className="flex justify-center items-center m-2">
                    <Text className="font-bold text-xl">No friends found</Text>
                  </View>
                );
              }
              return (
                <FriendCard
                  // @ts-ignore
                  name={item.username}
                  // @ts-ignore
                  email={item.email}
                  btnLabel="Message"
                  handleSubmit={() =>
                    // @ts-ignore
                    navigation.navigate("MessageChat" as never, { user: item })
                  }
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View className="flex justify-center items-center m-8">
          <Text className="font-bold text-xl">No friends to show</Text>
          <Text>When you become friends with people on</Text>
          <View className="flex-row">
            <Text className="font-bold">Kurakani</Text>
            <Text>, they'll appear here.</Text>
          </View>
        </View>
      )}
    </Box>
  );
};

export default FriendSection;
