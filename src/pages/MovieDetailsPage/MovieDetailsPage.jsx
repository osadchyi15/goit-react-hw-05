import { useContext, useEffect } from "react";
import { movieContext } from "../../context/MovieProvider/MovieProvider";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import MovieCast from "../../components/MovieCast/MovieCast";
import { fetchDetailsMovie } from "../../services/apiTMDB";

const MovieDetailsPage = () => {
  const { movieId, details, setDetails } = useContext(movieContext);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDetailsMovie(movieId);

        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, [movieId]);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w500${details.backdrop_path}")`,
        }}
      >
        <div>
          <div>
            <img
              src={"https://image.tmdb.org/t/p/w500" + `${details.poster_path}`}
              width={240}
              height={320}
              alt={details.title}
            />
          </div>
          <div>
            <p>
              {details.title === details.original_title ? (
                <>{details.title}</>
              ) : (
                <>
                  {details.title}&nbsp;({details.original_title})
                </>
              )}
            </p>
            <p>User score: {Math.round(details.vote_average * 10)}%</p>
            <p>Overview</p>
            <p>{details.overview}</p>
            <p>Genres</p>
            <p>
              {details.genres?.map((genre, index, array) => {
                return (
                  <span key={genre.id}>
                    {genre.name} {index < array.length - 1 && ", "}
                  </span>
                );
              }) ?? []}
            </p>
            <p>Homepage</p>
            <p>{details.homepage}</p>
          </div>
        </div>
        <div>
          <a href="">Cast</a>
          <a href="">Reviews</a>
        </div>
      </div>
      <MovieReviews />
      <MovieCast />
    </div>
  );
};

export default MovieDetailsPage;
