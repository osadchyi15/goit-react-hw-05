import css from "./MovieCard.module.css";
import { MdOutlineStarPurple500 } from "react-icons/md";

const MovieCard = ({
  posterUrl,
  movieTitle,
  movieYear,
  movieGenres,
  movieRating,
  movieId,
  genresList,
  onCardClick,
}) => {
  const genresFinder = movieGenres.map((movieGenre) => {
    const genre = genresList.find((genresItem) => genresItem.id === movieGenre);
    return genre.name;
  });

  return (
    <div className={css.movieCard} onClick={onCardClick} data-id={movieId}>
      <img src={posterUrl} alt={movieTitle} className={css.moviePoster} />

      <div className={css.movieText}>
        <h3 className={css.movieTitle}>{movieTitle}</h3>

        <div className={css.movieDescription}>
          <p className={css.movieInfo}>Rating : {movieRating} / 10</p>
          <p className={css.movieInfo}>Year: {movieYear}</p>
          <p className={css.movieInfo}>Genres: {genresFinder.join(", ")} </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
