import s from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { fetchCastMovie } from "../../services/apiTMDB";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import actorLogo from "../../img/actor.svg";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const { movieId } = useParams();

  const [castList, setCastList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    setIsError(false);

    const fetchCast = async () => {
      setIsLoading(true);
      try {
        const { cast } = await fetchCastMovie(movieId);

        setCastList(cast);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  useEffect(() => {
    const castId = document.querySelector("#cast");
    castId.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className={s.castWrapper} id="cast">
      {castList.length === 0 && !isLoading && (
        <p className={s.castOut}>No cast found.</p>
      )}

      {castList.length > 0 && (
        <ul className={s.castList}>
          {castList?.map((actor) => {
            return (
              <li className={s.castItem} key={actor.id}>
                <div
                  className={s.castCard}
                  style={{
                    background:
                      actor.profile_path && actor.profile_path.length > 0
                        ? `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url("https://image.tmdb.org/t/p/w500${actor.profile_path}")`
                        : `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${actorLogo})`,
                    backgroundSize:
                      actor.profile_path && actor.profile_path.length > 0
                        ? "cover"
                        : "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <div className={s.castInfo}>
                    <div>{actor.name}</div>
                    {actor.name.trim().toLowerCase() !==
                      actor.character.trim().toLowerCase() && (
                      <div>{actor.character}</div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </div>
  );
};

export default MovieCast;
