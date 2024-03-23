import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchTopratedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";

const ios = Platform.OS === "ios";

function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  }, []);

  // getting trending movie section
  async function getTrendingMovies() {
    const data = await fetchTrendingMovies();
    // console.log("got trending movies", data);
    if (data && data.results) {
      setTrending(data.results);
    }
    setLoading(false);
  }
  // getting upcoming movies section
  async function getUpComingMovies() {
    const data = await fetchUpcomingMovies();
    // console.log("got upcoming movies", data);
    if (data && data.results) {
      setUpcoming(data.results);
    }
  }
  // getting toprated movies section
  async function getTopRatedMovies() {
    const data = await fetchTopratedMovies();
    // console.log("got top rated movies", data);
    if (data && data.results) {
      setTopRated(data.results);
    }
  }
  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo  */}
      <SafeAreaView className={ios ? "mb-5" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>OVIES
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* trending movie carousel  */}

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {/* upcoming movies row  */}
          {upcoming.length > 0 && (
            <MovieList data={upcoming} title="Upcoming" />
          )}
          {/* top rated movies row  */}
          {topRated.length > 0 && (
            <MovieList data={topRated} title="TopRated" />
          )}
        </ScrollView>
      )}
    </View>
  );
}

export default HomeScreen;
