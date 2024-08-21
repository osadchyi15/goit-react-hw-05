import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.params = {
  api_key: "92d2a8bde9cffb89a83ffd544ec3aafa",
  language: "en-US",
};
axios.defaults.headers.common = {
  accept: "application/json",
};

export const fetchTrendingMovies = async (page) => {
  const { data } = await axios.get(`trending/movie/day?page=${page}`);
  console.log(data);
  return data;
};

export const getGenres = async () => {
  const { data } = await axios.get("genre/movie/list");
  return data;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`
  );
  return data;
};

export const fetchMovieActors = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`
  );
  return data;
};

export const fetchMovieReviews = async (movieId, page) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?page=${page}`
  );
  return data;
};
