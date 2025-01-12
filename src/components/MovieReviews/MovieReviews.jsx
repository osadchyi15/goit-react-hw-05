import { useEffect, useState } from "react";
import s from "./MovieReviews.module.css";

import { fetchReviewsMovie } from "../../services/apiTMDB";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviewsList, setReviewsList] = useState([]);
  const [pageReviews, setPageReviews] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!movieId) {
      setIsMoreBtn(false);
      return;
    }

    const fetchReviews = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const { results, total_pages } = await fetchReviewsMovie(
          movieId,
          pageReviews
        );

        setTotalPages(total_pages);
        setReviewsList((prev) => [...prev, ...results]);
        setIsMoreBtn(pageReviews < total_pages);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId, pageReviews]);

  useEffect(() => {
    const reviewsId = document.querySelector("#reviews");
    reviewsId.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const onClickMoreBtn = () => {
    if (pageReviews < totalPages) {
      setPageReviews((prev) => prev + 1);
    }
  };

  const formatReviewDate = (created_at, updated_at) => {
    if (created_at.slice(0, 19) === updated_at.slice(0, 19)) {
      return (
        <>
          {created_at.slice(0, 10)} &nbsp; {created_at.slice(11, 19)}
        </>
      );
    } else {
      return (
        <>
          {created_at.slice(0, 10)} &nbsp; {created_at.slice(11, 19)}
          &nbsp;(edited&nbsp; {updated_at.slice(0, 10)} &nbsp;
          {updated_at.slice(11, 19)})
        </>
      );
    }
  };

  return (
    <div>
      <div className={s.reviewsWrapper} id="reviews">
        {totalPages === 0 && !isLoading && (
          <p className={s.reviewsOut}>No reviews found.</p>
        )}

        {totalPages > 0 && (
          <ul className={s.reviewsList}>
            {reviewsList.map((review, index) => (
              <li className={s.reviewItem} key={review.id + index}>
                <div className={s.reviewAuthor}>{review.author}</div>
                <div className={s.reviewsContent}>{review.content}</div>
                <div className={s.reviewCreated}>
                  {formatReviewDate(review.created_at, review.updated_at)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {isMoreBtn && (
        <LoadMoreBtn isLoading={isLoading} onClickMoreBtn={onClickMoreBtn} />
      )}
    </div>
  );
};

export default MovieReviews;
