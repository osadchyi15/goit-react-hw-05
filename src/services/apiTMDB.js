import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = { language: "en-US, uk-UA" };
axios.defaults.headers.common = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmQyYThiZGU5Y2ZmYjg5YTgzZmZkNTQ0ZWMzYWFmYSIsIm5iZiI6MTcyMzk2MjUyMy40MzcsInN1YiI6IjY2YzE5NDliMWFhMDg5NjE1Y2MyMWY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Aho-eMFMVYkgOwnsfu1IXZVFAoZXAH7Ba7wL8ydUW4",
};

export const fetchTrendingToday = async (page) => {
  const { data } = await axios.get("/trending/movie/day", {
    params: {
      page,
    },
  });
  return data;
};

export const fetchSearchMovie = async (query, page) => {
  const { data } = await axios.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return data;
};

export const fetchDetailsMovie = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}`);
  return data;
};

export const fetchCastMovie = async (movieId, page) => {
  const { data } = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      page,
    },
  });
  return data;
};

export const fetchReviewsMovie = async (movieId, page) => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      page,
    },
  });
  return data;
};
