import { trpc } from "@libs/trpc";
import { Image, Pressable, Text, View } from "react-native";
import { RouterOutput } from "types/user";
import { useEffect, useState } from "react";

type Output = RouterOutput["getAllUser"];

interface ISuggestionCardProps {
  people: Output[0];
  user: any;
}
const SuggestionCard = ({ people, user }: ISuggestionCardProps) => {
  const utils = trpc.useContext();
  console.log(user);

  const { data } = trpc.checkRequest.useQuery({
    sender_id: user._id,
    receiver_id: people._id.toString(),
  });

  const { mutate: handleAdd, isLoading: addLoading } =
    trpc.addFriend.useMutation();

  const { mutate: handleCancel } = trpc.updateRequest.useMutation();

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data.status === "pending") {
      setMsgbtn("Cancel");
    } else {
      setMsgbtn("Add");
    }
  }, [data?.status]);

  const [msgbtn, setMsgbtn] = useState<"Add" | "Cancel">("Add");

  const handleAddFriend = (id: string) => {
    handleAdd(
      {
        sender_id: user._id,
        receiver_id: id,
      },
      {
        onSuccess: () => {
          utils.getAllUser.invalidate();
          setMsgbtn("Cancel");
        },
      }
    );
  };

  const handleCancelFriend = (id: string) => {
    handleCancel(
      {
        sender_id: user._id,
        receiver_id: id,
        status: "cancel",
      },
      {
        onSuccess: () => {
          setMsgbtn("Add");
          utils.getAllUser.invalidate();
        },
      }
    );
  };

  return (
    <View className="my-2 flex-row justify-between items-center p-3 bg-gray-200 rounded-md shadow-2xl">
      <View className={`flex flex-row items-center gap-3`}>
        <Image
          source={{
            uri: people.profile_pic,
          }}
          className="h-14 w-14 rounded-full bg-gray-400"
        />
        <View>
          <Text className="font-bold">{people.fullName}</Text>
          <Text className="text-xs text-gray">{people.email}</Text>
        </View>
      </View>
      <Pressable
        className={`bg-${
          !["Add", "Adding"].includes(msgbtn) ? "gray-600" : "primary"
        } w-24 rounded-md py-2`}
        onPress={() => {
          msgbtn === "Add"
            ? handleAddFriend(people._id.toString())
            : handleCancelFriend(people._id.toString());
        }}
      >
        <Text className="text-center text-white font-bold">
          {msgbtn}
          {addLoading && "ing"}
        </Text>
      </Pressable>
    </View>
  );
};

export default SuggestionCard;
