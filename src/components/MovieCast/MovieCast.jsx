import { useEffect, useState } from "react";
import { fetchMovieActors } from "../../services/api";
import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [castDetails, setCastDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        const { cast } = await fetchMovieActors(movieId);
        setCastDetails(cast);
      } catch (err) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={css.castInformation}>
      {isLoading && <Loader />}
      {error !== null && <p>{error}</p>}
      <ul className={css.actorsList}>
        {castDetails &&
          castDetails.map((actor) => (
            <li key={actor.id} className={css.actorsItem}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className={css.foto}
                />
              ) : (
                <FaUserSecret className={css.foto} />
              )}
              <div className={css.dscrActor}>
                <p className={css.actor}>Actor </p>
                <p>{actor.name}</p>
              </div>
              <div className={css.dscrCharacter}>
                <p className={css.character}>Character</p>
                <p>{actor.character}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieCast;
