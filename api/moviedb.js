import axios from "axios";
import { APIKEY } from "../constants";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${APIKEY}`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${APIKEY}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${APIKEY}`;

export const fallbackimage =
  "https://klr.ac.in/wp-content/uploads/2015/11/dummy-user-1-200x200.jpg";

export const fallBackPosterImage =
  "https://st2.depositphotos.com/4819429/9866/v/950/depositphotos_98663594-stock-illustration-film-reel-and-ticket-icon.jpg";

const movieDetailsEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${APIKEY}`;

const movieEditEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${APIKEY}`;

const similarMovieEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${APIKEY}`;

const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${APIKEY}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${APIKEY}`;

const searchMovieEndpoint = `${apiBaseUrl}/search/movie?api_key=${APIKEY}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

async function apiCall(endpoint, params) {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
}

export function fetchTrendingMovies() {
  return apiCall(trendingMoviesEndpoint);
}

export function fetchUpcomingMovies() {
  return apiCall(upComingMoviesEndpoint);
}

export function fetchTopratedMovies() {
  return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndPoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieEditEndPoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMovieEndPoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const fetchSearchMovies = (params) => {
  return apiCall(searchMovieEndpoint, params);
};
