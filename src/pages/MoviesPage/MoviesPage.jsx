import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

import { fetchSearchMovie } from "../../services/apiTMDB";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import s from "./MoviesPage.module.css";
import toast from "react-hot-toast";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [pageSearch, setPageSearch] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchList, setSearchList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  const handleChangeQuery = (newQuery) => {
    setSearchList([]);

    if (!newQuery || newQuery.trim().length === 0) {
      searchParams.delete("query");
      setSearchParams({});
      toast.error("Search query is empty!", { position: "bottom-right" });
      return;
    }

    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!query) {
      setIsMoreBtn(false);
      return;
    }

    setIsError(false);

    const fetchSearch = async () => {
      setIsLoading(true);
      try {
        setIsMoreBtn(false);

        const { results, total_pages } = await fetchSearchMovie(
          query,
          pageSearch
        );

        setTotalPages(total_pages);
        setSearchList((prev) => [...prev, ...results]);
        setIsMoreBtn(true);

        if (pageSearch === totalPages) {
          setIsMoreBtn(false);
          toast("You have reached the end of collection!", {
            icon: "✨",
            position: "bottom-right",
          });
        }

        if (results.length === 0) {
          setIsMoreBtn(false);
          toast("Ooops!\nNothing found matching your request.", {
            icon: "🤷‍♀️",
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearch();
  }, [query, pageSearch]);

  const onClickMoreBtn = () => {
    setPageSearch((prev) => prev + 1);
  };

  return (
    <div>
      <SearchForm handleChangeQuery={handleChangeQuery} />
      <div className={s.moviesPage}>
        {isLoading && <Loader />}
        <MovieList moviesList={searchList} />
        {isMoreBtn && (
          <LoadMoreBtn isLoading={isLoading} onClickMoreBtn={onClickMoreBtn} />
        )}
        {isError && <ErrorMessage />}
      </div>
    </div>
  );
};

export default MoviesPage;
