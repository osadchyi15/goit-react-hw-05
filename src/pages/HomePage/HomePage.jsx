import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingToday } from "../../services/apiTMDB";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [pageTrends, setPageTrends] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoading(true);

        const { results, total_pages } = await fetchTrendingToday(pageTrends);

        setTotalPages(total_pages);
        setMoviesList((prev) => [...prev, ...results]);
        setIsLoading(false);

        pageTrends === totalPages ? setIsMoreBtn(false) : setIsMoreBtn(true);
      } catch (error) {
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
      {isLoading && <Loader />}
      <MovieList moviesList={moviesList} />
      {isMoreBtn && (
        <LoadMoreBtn isLoading={isLoading} onClickMoreBtn={onClickMoreBtn} />
      )}
    </div>
  );
};

export default HomePage;
