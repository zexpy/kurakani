import Box from "@components/Box";
import Loading from "@components/Loading";
import { trpc } from "@libs/trpc";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RouterOutput } from "types/user";
import Card from "../ui/Card";
type UserOutput = RouterOutput["getAllUser"];

const Hello = ({ data }: { data: UserOutput[0] }) => {
  return (
    <TouchableOpacity>
      <Card>
        <Text>{data.username}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const AddFriend = () => {
  const { isLoading, data } = trpc.getAllUser.useQuery();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
      {data.map((people) => (
        <Hello data={people} key={people._id.toString()} />
      ))}
    </Box>
  );
};

export default AddFriend;
