import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ trendingMovies, genresList }) => {
  return (
    <ul className={css.moviesList}>
      {trendingMovies.map((movie) => {
        return (
          <Link
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
            />
          </Link>
        );
      })}
    </ul>
  );
};

export default MovieList;
