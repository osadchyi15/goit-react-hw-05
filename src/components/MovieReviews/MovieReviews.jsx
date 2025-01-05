import { useContext, useEffect } from "react";
import s from "./MovieReviews.module.css";
import { movieContext } from "../../context/MovieProvider/MovieProvider";
import { fetchReviewsMovie } from "../../services/apiTMDB";

const MovieReviews = () => {
  const { reviews, setReviews, movieId, pageReviews, setPageReviews } =
    useContext(movieContext);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        const data = await fetchReviewsMovie(movieId, pageReviews);
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [movieId, pageReviews]);

  const reviewsList = reviews.results;

  return (
    <div>
      <ul>
        {reviewsList?.map((review) => {
          return (
            <li key={review.id}>
              <div>{review.author}</div>
              <div>{review.content}</div>
              <div>
                {review.created_at.slice(0, 19) ===
                review.updated_at.slice(0, 19) ? (
                  <>
                    {review.created_at.slice(0, 10)} &nbsp;
                    {review.created_at.slice(11, 19)}
                  </>
                ) : (
                  <>
                    {review.created_at.slice(0, 10)} &nbsp;
                    {review.created_at.slice(11, 19)}&nbsp;(edited&nbsp;
                    {review.updated_at.slice(0, 10)} &nbsp;
                    {review.updated_at.slice(11, 19)})
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieReviews;
