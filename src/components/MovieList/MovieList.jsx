import s from "./MovieList.module.css";
import logoFilm from "../../img/film.svg";
import { Rating } from "react-simple-star-rating";
import { Link, useLocation } from "react-router-dom";
import ToTopButton from "../ToTopButton/ToTopButton";
import { useEffect, useState } from "react";

const MovieList = ({ moviesList }) => {
  const location = useLocation();

  const [windowScroll, setWindowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 100 ? setWindowScroll(true) : setWindowScroll(false);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const onClickTopButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setWindowScroll(false);
  };

  return (
    <div>
      <ul className={s.movieList}>
        {moviesList.map((movie, index) => {
          return (
            <li className={s.movieItem} key={movie.id + index}>
              <div
                className={s.movie}
                style={{
                  background:
                    movie.poster_path && movie.poster_path.length > 0
                      ? `linear-gradient( rgba(0, 0, 0, 1), rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url("https://image.tmdb.org/t/p/w500${movie.poster_path}")`
                      : `linear-gradient( rgba(0, 0, 0, 1), rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${logoFilm})`,
                  backgroundSize:
                    movie.poster_path && movie.poster_path.length > 0
                      ? "cover"
                      : "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div className={s.topInfo}>
                  <p className={s.movieTitle}>{movie.original_title}</p>
                  <div
                    className={s.stars}
                    style={{
                      direction: "ltr",
                      fontFamily: "sans-serif",
                      touchAction: "none",
                    }}
                  >
                    <Rating
                      allowFraction
                      iconsCount={5}
                      readonly={true}
                      initialValue={movie.vote_average / 2}
                      onClick={function noRefCheck() {}}
                      size={20}
                    />
                  </div>
                </div>
                <div className={s.bottomInfo}>
                  <Link
                    to={`/movies/${movie.id}`}
                    className={s.buildLinkClass}
                    state={location}
                  >
                    <p className={s.movieInfoBtn}>More info</p>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
        {windowScroll && <ToTopButton onClickTopButton={onClickTopButton} />}
      </ul>
    </div>
  );
};

export default MovieList;
