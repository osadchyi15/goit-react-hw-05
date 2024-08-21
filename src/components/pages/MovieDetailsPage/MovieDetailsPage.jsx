import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { fetchMovieDetails, getGenres } from "../../../services/api";

import ToTopButton from "../../ToTopButton/ToTopButton";
import Loader from "../../Loader/Loader";

import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [windowScroll, setWindowScroll] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const movieDetails = await fetchMovieDetails(movieId);
        setMovieDetails(movieDetails);
      } catch (err) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

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

  return (
    <>
      {movieDetails !== null && (
        <div className={css.detailsPage}>
          <h1 className={css.movieDetailsTitle}>
            About the movie "{movieDetails.title}"
          </h1>
          {isLoading && <Loader />}
          {error !== null && <p>{error}</p>}
          <div className={css.movieDetails}>
            <img
              className={css.moviePoster}
              src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path}
              alt={movieDetails.title}
            />
            <div className={css.movieDescr}>
              <p className={css.movieTitle}>
                {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
              </p>

              <p className={css.movieDescrText}>
                User Score: {Math.round(movieDetails.vote_average) * 10}%
              </p>
              <div>
                <p className={css.movieDescrTitle}>Overview</p>
                <p className={css.movieDescrText}>{movieDetails.overview}</p>
              </div>
              <div>
                <p className={css.movieDescrTitle}>Genres</p>
                <p className={css.movieDescrText}>
                  {movieDetails.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={css.additional}>
        <h2 className={css.additionalTitle}>Additional information</h2>
        <div className={css.additionalLinks}>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="cast"
          >
            Cast
          </NavLink>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="reviews"
          >
            Reviews
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </div>

      {windowScroll && <ToTopButton onClickTopButton={onClickTopButton} />}
    </>
  );
};

export default MovieDetailsPage;
