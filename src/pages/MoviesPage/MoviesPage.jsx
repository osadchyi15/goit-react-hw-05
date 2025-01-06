import { useContext, useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { movieContext } from "../../context/MovieProvider/MovieProvider";
import { fetchSearchMovie } from "../../services/apiTMDB";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import s from "./MoviesPage.module.css";
import toast from "react-hot-toast";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MoviesPage = () => {
  const { query, searchList, setSearchList } = useContext(movieContext);

  const [pageSearch, setPageSearch] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!query) {
      toast.error("Request is empty. \n Enter your request.", {
        position: "bottom-right",
      });
      setIsMoreBtn(false);
      return;
    }

    setIsError(false);

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

        pageSearch === totalPages &&
          setIsMoreBtn(false) &
            toast("You have reached the end of collection!", {
              icon: "✨",
              position: "bottom-right",
            });

        results.length === 0 &&
          setIsMoreBtn(false) &
            toast("Ooops!\nNothing found matching your request.", {
              icon: "🤷‍♀️",
              position: "bottom-right",
            });
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
    <div className={s.moviesPage}>
      {isLoading && <Loader />}
      <MovieList moviesList={searchList} />
      {isMoreBtn && (
        <LoadMoreBtn isLoading={isLoading} onClickMoreBtn={onClickMoreBtn} />
      )}
      {isError && <ErrorMessage />}
    </div>
  );
};

export default MoviesPage;
