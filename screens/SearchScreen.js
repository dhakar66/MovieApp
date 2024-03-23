import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fallBackPosterImage,
  fetchSearchMovies,
  image185,
} from "../api/moviedb";
import { debounce } from "lodash";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  let movieName = "a walk in the clouds and the matrix the little buddha";
  const [results, setResults] = useState([]);
  //   const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: 1,
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="justify-between flex-row border border-neutral-500 rounded-full mx-4 mb-3 items-center">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Input"
          placeholderTextColor="lightgray"
          className="pl-6 pb-1 text-white font-semibold tracking-wider flex-1 text-base "
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full bg-neutral-500 p-3 m-1"
        >
          <XMarkIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* results   */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Result ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      // source={require("../assets/images/walkincloud.jpg")}
                      source={{
                        uri: image185(item?.poster_path) || fallBackPosterImage,
                      }}
                      style={{ height: height * 0.3, width: width * 0.44 }}
                      className="rounded-3xl"
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center mt-9">
          <Image
            source={require("../assets/images/movietime2.webp")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
