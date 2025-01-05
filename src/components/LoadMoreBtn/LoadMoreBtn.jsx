import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClickMoreBtn, isLoading }) => {
  return (
    <div>
      <button
        className={css.loadMoreButton}
        type="button"
        onClick={onClickMoreBtn}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
