import { useEffect, useRef, useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { fetchMovieDetails, getGenres } from "../../services/api";

import { BsFileImage } from "react-icons/bs";
import ToTopButton from "../../components/ToTopButton/ToTopButton";
import Loader from "../../components/Loader/Loader";

import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [windowScroll, setWindowScroll] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? "/");

  console.log(location);

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
          <Link to={backLinkRef.current} className={css.goBackBtn}>
            &#8617; Go back
          </Link>
          <h1 className={css.movieDetailsTitle}>
            About the movie "{movieDetails.title}"
          </h1>
          {isLoading && <Loader />}
          {error !== null && <p>{error}</p>}
          <div className={css.movieDetails}>
            <div className={css.posterWrapper}>
              {movieDetails.poster_path === null ? (
                <BsFileImage className={css.moviePoster} />
              ) : (
                <img
                  className={css.moviePoster}
                  src={
                    "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path
                  }
                  alt={movieDetails.title}
                />
              )}
            </div>

            <div className={css.movieDescr}>
              <p className={css.movieTitle}>
                {movieDetails.title}{" "}
                {movieDetails.release_date === null
                  ? ""
                  : movieDetails.release_date.slice(0, 4)}
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
