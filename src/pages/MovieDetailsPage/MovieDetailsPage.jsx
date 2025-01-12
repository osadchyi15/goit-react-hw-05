import { useEffect, useRef, useState } from "react";
import { fetchDetailsMovie } from "../../services/apiTMDB";
import s from "./MovieDetailsPage.module.css";
import { Rating } from "react-simple-star-rating";
import ToTopButton from "../../components/ToTopButton/ToTopButton";
import { IoIosArrowBack } from "react-icons/io";
import Loader from "../../components/Loader/Loader";
import filmLogo from "../../img/film.svg";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [windowScroll, setWindowScroll] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/mvies");

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);

        const data = await fetchDetailsMovie(movieId);

        setDetails(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (!movieId) return <p>No movie selected</p>;

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div
        className={s.detailsWrapper}
        style={{
          backgroundImage: `radial-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url("https://image.tmdb.org/t/p/w500${details.poster_path}")`,
        }}
      >
        {/* button BACK HOME */}
        <div className={s.detailsBackBtn}>
          <Link to={goBackRef.current} className={s.backBtn}>
            <div className={s.backBtnArrow}>
              <IoIosArrowBack />
            </div>
            <p className={s.backBtnText}>Back Home</p>
          </Link>
        </div>

        {/* Text information  about movie*/}
        <div className={s.detailsInfo}>
          <div className={s.detailsInfoList}>
            <div className={s.detailsInfoItem}>
              <div className={s.detailsInfoTitle}>
                {details.title === details.original_title ? (
                  <div>{details.title}</div>
                ) : (
                  <div>
                    <p className={s.title}>{details.title}</p>
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

            {/* Links */}
            <ul className={s.detailsLinks}>
              {details.homepage && (
                <li className={s.detailsInfoItem}>
                  <a className={s.link} href={details.homepage} target="_blank">
                    Homepage
                  </a>
                </li>
              )}
              <li className={s.detailsInfoItem}>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </li>
              <li className={s.detailsInfoItem}>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Movie poster */}
        <div className={s.detailsPoster}>
          <img
            className={s.detailsPosterImg}
            src={
              details.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : `${filmLogo}`
            }
            width={360}
            height={480}
            alt={details.title}
          />
        </div>
      </div>

      <Outlet />

      {isLoading && <Loader />}
      {windowScroll && <ToTopButton onClickTopButton={onClickTopButton} />}
    </div>
  );
};

export default MovieDetailsPage;
