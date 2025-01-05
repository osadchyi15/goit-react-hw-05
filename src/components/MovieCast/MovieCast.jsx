import s from "./MovieCast.module.css";

import { useContext, useEffect } from "react";
import { movieContext } from "../../context/MovieProvider/MovieProvider";
import { fetchCastMovie } from "../../services/apiTMDB";

const MovieCast = () => {
  const { cast, setCast, movieId, pageCast, setPageCast } =
    useContext(movieContext);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      try {
        const data = await fetchCastMovie(movieId, pageCast);
        setCast(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCast();
  }, [movieId, pageCast]);

  const castList = cast.cast;

  return (
    <div>
      <ul>
        {castList?.map((actor) => {
          return (
            <li key={actor.id}>
              <div>
                <img
                  src={
                    "https://image.tmdb.org/t/p/w500" + `${actor.profile_path}`
                  }
                />
              </div>
              <div>{actor.name}</div>
              <div>{actor.character}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieCast;
