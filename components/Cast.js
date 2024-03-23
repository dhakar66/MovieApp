import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { fallbackimage, image185 } from "../api/moviedb";

export default function Cast({ cast, navigation }) {
  let personName = "Keeanu Reeves";
  let charcterName = "John Wick";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mb-5 mx-5">Top Cast</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className="rounded-full overflow-hidden h-20 w-20 justify-center items-center border border-neutral-500">
                  <Image
                    // source={require("../assets/images/keeanu.jpeg")}
                    source={{
                      uri: image185(person?.profile_path) || fallbackimage,
                    }}
                    className="h-24 w-20 rounded-2xl"
                  />
                </View>
                <Text className="text-white mt-1 text-xs">
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text className="text-neutral-400 mt-1 text-xs">
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
