import MovieCard from "../MovieCard/MovieCard";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ results, genresList }) => {
  const location = useLocation();
  return (
    <ul className={css.moviesList}>
      {results.map((movie) => {
        return (
          <Link
            state={{ from: location }}
            to={`/movies/${movie.id}`}
            className={css.moviesListItem}
            key={movie.id}
          >
            <MovieCard
              posterUrl={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              movieTitle={movie.title}
              movieYear={movie.release_date.slice(0, 4)}
              movieGenres={movie.genre_ids}
              movieRating={movie.vote_average.toFixed(2)}
              movieId={movie.id}
              genresList={genresList}
              imageUrl={movie.poster_path}
            />
          </Link>
        );
      })}
    </ul>
  );
};

export default MovieList;
