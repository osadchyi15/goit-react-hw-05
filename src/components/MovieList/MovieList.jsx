import s from "./MovieList.module.css";
import logoFilm from "../../img/film.svg";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";

const MovieList = ({ moviesList }) => {
  return (
    <div>
      <ul className={s.movieList}>
        {moviesList.map((movie, index) => {
          return (
            <li
              className={s.movieItem}
              key={movie.id + index}
              // onClick={handleMovieClick}
              // data-movieid={movie.id}
            >
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
                  <Link to={`/movies/${movie.id}`} className={s.buildLinkClass}>
                    <p
                      className={s.movieInfoBtn}
                      // onClick={handleMovieClick}
                      // data-movieid={movie.id}
                    >
                      More info
                    </p>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
