import { createContext, useState } from "react";

export const movieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movieId, setMovieId] = useState(0);
  const [query, setQuery] = useState("");
  const [searchList, setSearchList] = useState([]);

  const contextValue = {
    movieId,
    setMovieId,
    searchList,
    setSearchList,
    query,
    setQuery,
  };

  return (
    <movieContext.Provider value={contextValue}>
      {children}
    </movieContext.Provider>
  );
};

export default MovieProvider;
