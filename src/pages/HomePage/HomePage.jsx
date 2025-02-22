import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingToday } from "../../services/apiTMDB";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [pageTrends, setPageTrends] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);

    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await fetchTrendingToday(pageTrends);

        setTotalPages(total_pages);
        setMoviesList((prev) => [...prev, ...results]);
        setIsLoading(false);

        pageTrends === totalPages
          ? setIsMoreBtn(false) &
            toast("You have reached the end of collection!", {
              icon: "✨",
              position: "bottom-right",
            })
          : setIsMoreBtn(true);

        results.length === 0 &&
          setIsMoreBtn(false) &
            toast("Ooops!\nNothing found matching your request.", {
              icon: "🤷‍♀️",
              position: "bottom-right",
            });
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, [pageTrends]);

  const onClickMoreBtn = () => {
    setPageTrends((prev) => prev + 1);
  };

  return (
    <div>
      <div className={s.homePage}>
        {isLoading && <Loader />}
        <MovieList moviesList={moviesList} />
        {isMoreBtn && (
          <LoadMoreBtn isLoading={isLoading} onClickMoreBtn={onClickMoreBtn} />
        )}
        {isError && <ErrorMessage />}
      </div>
    </div>
  );
};

export default HomePage;
