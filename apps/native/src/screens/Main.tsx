import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Box from "@components/Box";
import Post from "@components/Post";
import { faker } from "@faker-js/faker";

export enum ContentType {
  TEXT = "text",
  IMAGE = "image",
}

const Main = ({ navigation }) => {
  return (
    <Box>
      <View className="flex flex-row justify-between items-center pb-2">
        <Text className="text-xl font-bold">Latest Posts</Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            className="h-10 w-10"
          />
        </TouchableOpacity>
      </View>
      {/* <Story /> */}
      <FlatList
        data={Array.from(Array(10))}
        renderItem={() => (
          <Post
            name={faker.person.fullName()}
            avatar={faker.image.avatarLegacy()}
            description={faker.lorem.sentences()}
            contentType={ContentType.IMAGE}
            imageUrl={faker.image.url()}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default Main;
