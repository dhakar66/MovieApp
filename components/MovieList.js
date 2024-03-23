import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import {
  fallBackPosterImage,
  fallbackimage,
  image185,
  image342,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function MovieList({ data, title, hideSeeAll }) {
  // let MovieName = "A Walk in the Clouds";
  const navigation = useNavigation();
  return (
    <View className="space-y-5 mb-8">
      <View className="mx-5 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        // bounces={false}
      >
        {data.map((item, index) => {
          // let MovieName = item.title;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  // source={require("../assets/images/notebook.jpg")}
                  source={{
                    uri: image185(item.poster_path) || fallBackPosterImage,
                  }}
                  style={{ width: width * 0.33, height: height * 0.22 }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1">
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
