import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loader from "../../Loader/Loader";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";
import MovieList from "../../MovieList/MovieList";
import ToTopButton from "../../ToTopButton/ToTopButton";

import { getGenres, searchMovies } from "../../../services/api";

import css from "./MoviesPage.module.css";

const initialValues = {
  query: "",
};

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [genresList, setGenresList] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [windowScroll, setWindowScroll] = useState(false);

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
    const fethcSearchResults = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        setIsBtnVisible(false);
        const { results, total_pages } = await searchMovies(query, page);

        setTotalPages(totalPages);
        setIsBtnVisible(true);

        if (results.length === 0) {
          setIsBtnVisible(false);
          return toast.error("Sorry. No images found for your request!");
        } else {
          setIsBtnVisible(true);
        }

        if (page === 1) {
          setMovies(results);
        } else {
          setMovies((prevImages) => [...prevImages, ...results]);
        }

        setIsBtnVisible(page < total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fethcSearchResults();
  }, [query, page]);

  const onSearch = (query) => {
    setMovies([]);
    setQuery(query);
    setPage(1);
    if (!query.trim()) {
      setIsBtnVisible(false);
      return toast.error("Fill some request!");
    }
  };

  const handlSubmit = (values, actions) => {
    onSearch(values.query);
    actions.resetForm();
  };

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
      <section title="Movies" className={css.movies}>
        <Toaster position="top-right" />
        <h1 className={css.moviesTitle}>Movies search</h1>
        <Formik initialValues={initialValues} onSubmit={handlSubmit}>
          {({ errors }) => (
            <Form className={css.searchForm}>
              <Field
                className={css.searchInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
                name="query"
              />
              <button className={css.searchButton} type="submit">
                Search
              </button>
            </Form>
          )}
        </Formik>
        {isLoading && <Loader />}
        {error !== null && <p>{error}</p>}

        {Array.isArray(movies) && (
          <MovieList genresList={genresList} results={movies} />
        )}
        {page === totalPages && (
          <p className={css.theEnd}>There are all reviews what we have!</p>
        )}
        {movies && isBtnVisible && (
          <LoadMoreBtn onClickMoreBtn={onClickMoreBtn} isLoading={isLoading} />
        )}
        {windowScroll && <ToTopButton onClickTopButton={onClickTopButton} />}
      </section>
    </>
  );
};

export default MoviesPage;
