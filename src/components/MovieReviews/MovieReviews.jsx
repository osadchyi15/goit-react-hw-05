import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Number);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  console.log(page, totalPages);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setIsBtnVisible(false);

        const { results, page, total_pages } = await fetchMovieReviews(movieId);
        setResults(results);
        setPage(page);
        setTotalPages(total_pages);
        setIsBtnVisible(true);

        if (page === 1) {
          setResults(results);
        } else {
          setResults((prevResults) => [...prevResults, ...results]);
        }

        setIsBtnVisible(page < totalPages);

        console.log(page, totalPages);
      } catch (err) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movieId, page]);

  const onClickMoreBtn = () => {
    setPage((actPage) => actPage + 1);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error !== null && <p>{error}</p>}
      <Toaster position="bottom-right" />

      {results && (
        <ul className={css.reviewList}>
          {results.map((review) => {
            return (
              <li key={review.id} className={css.reviewItem}>
                <p className={css.reviewAutor}>Author: {review.author}</p>
                <p className={css.reviewText}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
      {results === null ||
        (results.length === 0 && (
          <p className={css.sorry}>
            Sorry. We don't have any reviews for this movie.
          </p>
        ))}
      {page === totalPages && (
        <p className={css.theEnd}>There are all reviews what we have!</p>
      )}
      {results && isBtnVisible && (
        <LoadMoreBtn onClickMoreBtn={onClickMoreBtn} isLoading={isLoading} />
      )}
    </>
  );
};

export default MovieReviews;
