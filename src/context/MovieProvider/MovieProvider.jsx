import { createContext, useState } from "react";

export const movieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movieId, setMovieId] = useState(0);
  const [details, setDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const [query, setQuery] = useState("");

  const [pageTrends, setPageTrends] = useState(1);
  const [pageCast, setPageCast] = useState(1);
  const [pageReviews, setPageReviews] = useState(1);
  const [pageSearch, setPageSearch] = useState(1);

  const contextValue = {
    searchList,
    setSearchList,
    movieId,
    setMovieId,
    details,
    setDetails,
    cast,
    setCast,
    reviews,
    setReviews,
    query,
    setQuery,
    pageTrends,
    setPageTrends,
    pageCast,
    setPageCast,
    pageReviews,
    setPageReviews,
    pageSearch,
    setPageSearch,
  };

  return (
    <movieContext.Provider value={contextValue}>
      {children}
    </movieContext.Provider>
  );
};

export default MovieProvider;
