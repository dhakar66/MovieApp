import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles, theme } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallBackPosterImage,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

const ios = Platform.OS === "ios";
var { width, height } = Dimensions.get("window");
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  let MovieName = "A Walk in the Clouds";

  const { params: item } = useRoute();
  const [isFavourite, setFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const navigation = useNavigation();
  useEffect(() => {
    // console.log("item id", item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  async function getMovieDetails(id) {
    const data = await fetchMovieDetails(id);
    // console.log("got movie details", data);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  }

  async function getMovieCredits(id) {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) {
      setCast(data.cast);
    }
    setLoading(false);
  }
  async function getSimilarMovies(id) {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setRelatedMovies(data.results);
    }
    setLoading(false);
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute w-full flex-row justify-between z-20 items-center px-4" +
            topMargin
          }
        >
          <View
            className={
              "px-5 flex-row justify-between w-full  items-center z-20" +
              topMargin
            }
          >
            <TouchableOpacity
              style={styles.background}
              className="rounded-xl p-1"
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon size={28} color="white" strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFavourite(!isFavourite)}>
              <HeartIcon
                size={28}
                color={isFavourite ? theme.background : "white"}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {/* check first if its loading or not  */}
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallBackPosterImage,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details  */}
      {loading ? (
        ""
      ) : (
        <>
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            <Text className="text-white text-3xl text-center font-bold tracking-wider">
              {movie?.title}
            </Text>
            {movie?.id ? (
              <Text className=" text-base text-center font-semibold text-neutral-400">
                {movie?.status} : {movie?.release_date?.split("-")[0]} :{" "}
                {movie?.runtime}m
              </Text>
            ) : null}

            <View className="flex-row justify-center mx-4 space-x-2">
              {movie?.genres?.map((genre, index) => {
                let showDot = index < movie.genres.length - 1;
                return (
                  <Text
                    key={index}
                    className="text-neutral-400 text-center font-semibold text-base"
                  >
                    {genre?.name} {showDot ? "." : null}
                  </Text>
                );
              })}
            </View>

            <Text className="text-neutral-400 text-center mx-4">
              {movie?.overview}
            </Text>
          </View>
          {/* cast  */}
          {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
          {/* movie list  */}
          {relatedMovies.length > 0 && (
            <MovieList
              title="Related Movies"
              hideSeeAll={true}
              data={relatedMovies}
            />
          )}
        </>
      )}
    </ScrollView>
  );
}
