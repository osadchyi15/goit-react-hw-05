import { useContext, useEffect, useState } from "react";
import { movieContext } from "../../context/MovieProvider/MovieProvider";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import MovieCast from "../../components/MovieCast/MovieCast";
import { fetchDetailsMovie } from "../../services/apiTMDB";
import s from "./MovieDetailsPage.module.css";
import { Rating } from "react-simple-star-rating";
import ToTopButton from "../../components/ToTopButton/ToTopButton";

const MovieDetailsPage = () => {
  const { movieId } = useContext(movieContext);

  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [windowScroll, setWindowScroll] = useState(false);

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
    <div>
      <div
        className={s.detailsWrapper}
        style={{
          backgroundImage: `radial-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url("https://image.tmdb.org/t/p/w500${details.poster_path}")`,
        }}
      >
        <div className={s.backBtn}>
          <p className={s.backBtnArrow}>&#60;</p>
          <p className={s.backBtnText}>Back Home</p>
        </div>

        <div className={s.detailsMainInfo}>
          <div className={s.detailsInfo}>
            <img
              className={s.detailsPoster}
              src={
                details.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                  : `/film.svg`
              }
              width={360}
              height={480}
              alt={details.title}
            />

            <div className={s.detailsInfoList}>
              <div className={s.detailsInfoItem}>
                <div className={s.detailsInfoTitle}>
                  {details.title === details.original_title ? (
                    <div>{details.title}</div>
                  ) : (
                    <div>
                      <p>{details.title}</p>
                      <p>{details.original_title} </p>
                    </div>
                  )}
                </div>

                <div
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
                    initialValue={details.vote_average / 2}
                    onClick={function noRefCheck() {}}
                    size={20}
                  />
                </div>
              </div>

              <div className={s.detailsInfoItem}>
                <p>{details.overview}</p>
              </div>

              <div className={s.detailsInfoItem}>
                <p>
                  {details.genres?.map((genre, index, array) => {
                    return (
                      <span key={genre.id}>
                        {genre.name} {index < array.length - 1 && ", "}
                      </span>
                    );
                  }) ?? []}
                </p>
              </div>
              {details.homepage && (
                <div className={(s.detailsInfoItem, s.detailsHomePage)}>
                  <a
                    className={s.detailsHomePage}
                    href={details.homepage}
                    target="_blank"
                  >
                    Movie Webpage
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            <a href="">Cast</a>
            <a href="">Reviews</a>
          </div>
        </div>
      </div>

      {/* <MovieReviews /> */}
      {/* <MovieCast /> */}

      {windowScroll && <ToTopButton onClickTopButton={onClickTopButton} />}
    </div>
  );
};

export default MovieDetailsPage;
