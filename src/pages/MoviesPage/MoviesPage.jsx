import { useContext, useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { movieContext } from "../../context/MovieProvider/MovieProvider";
import { fetchSearchMovie } from "../../services/apiTMDB";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const { query, searchList, setSearchList } = useContext(movieContext);

  const [pageSearch, setPageSearch] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return setIsMoreBtn(false);

    const fetchSearch = async () => {
      try {
        setIsLoading(true);
        setIsMoreBtn(false);
        const { results, total_pages } = await fetchSearchMovie(
          query,
          pageSearch
        );

        setTotalPages(total_pages);
        setSearchList((prev) => [...prev, ...results]);

        setIsMoreBtn(true);
        pageSearch === totalPages && setIsMoreBtn(false);
        results.length === 0 && setIsMoreBtn(false);
      } catch (error) {
        console.log(error);
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
    <div className={s.moviesPage}>
      {isLoading && <Loader />}
      <MovieList moviesList={searchList} />
      {isMoreBtn && (
        <LoadMoreBtn isLoading={isLoading} onClickMoreBtn={onClickMoreBtn} />
      )}
    </div>
  );
};

export default MoviesPage;
