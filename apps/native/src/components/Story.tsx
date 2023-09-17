import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import colors from "../assets/colors";
import { PlusIcon } from "react-native-heroicons/outline";

export default function Story() {
  return (
    <View className="mt-2">
      <View className="flex-row gap-5 items-center">
        <TouchableOpacity>
          <View className="bg-blue-100 h-[60] w-[60] rounded-full flex justify-center items-center">
            <PlusIcon color={colors.primary} />
          </View>
        </TouchableOpacity>
        <ScrollView
          horizontal
          contentContainerStyle={{
            gap: 10,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {Array.from(Array(10)).map((_, index) => (
            <TouchableOpacity key={`image_${index}`}>
              <Image
                source={{
                  uri: "https://imgv3.fotor.com/images/gallery/AI-3D-Female-Profile-Picture.jpg",
                }}
                className="h-[60] w-[60] rounded-full rounded-"
                alt="Hello"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
