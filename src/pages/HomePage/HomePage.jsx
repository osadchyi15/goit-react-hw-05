import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { fetchTrendingMovies, getGenres } from "../../services/api";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import ToTopButton from "../../components/ToTopButton/ToTopButton";

import css from "./HomePage.module.css";

const HomePage = () => {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [genresList, setGenresList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [windowScroll, setWindowScroll] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGenresList = async () => {
      try {
        const { genres } = await getGenres();
        setGenresList(genres);
      } catch (err) {
        console.log(error.message);
      }
    };
    getGenresList();
  }, [page]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoading(true);
        setIsBtnVisible(false);

        const { results, total_pages: totalPages } = await fetchTrendingMovies(
          page
        );

        setTotalPages(totalPages);
        setIsBtnVisible(true);

        if (page === 1) {
          setResults(results);
        } else {
          setResults((prevResults) => [...prevResults, ...results]);
        }

        setIsBtnVisible(page < totalPages);

        if (page === totalPages) {
          return toast.error("You are reached to the end of collection!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 100 ? setWindowScroll(true) : setWindowScroll(false);
    };
    window.addEventListener("scroll", handleScroll);
  }, [window.scrollY]);

  const onClickTopButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setWindowScroll(false);
  };

  const onClickMoreBtn = () => {
    setPage((actPage) => actPage + 1);
  };

  return (
    <>
      <section title="HomePage" className={css.homePage}>
        <Toaster position="top-right" />
        <h1 className={css.homeTitle}>Trending today</h1>
        {isLoading && <Loader />}
        {error !== null && <p>{error}</p>}
        {Array.isArray(results) && (
          <MovieList genresList={genresList} results={results} />
        )}
        {results && isBtnVisible && (
          <LoadMoreBtn onClickMoreBtn={onClickMoreBtn} isLoading={isLoading} />
        )}
        {windowScroll && <ToTopButton onClickTopButton={onClickTopButton} />}
      </section>
    </>
  );
};

export default HomePage;
