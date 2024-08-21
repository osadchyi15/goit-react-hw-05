import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClickMoreBtn, isLoading }) => {
  return (
    <div>
      <button type="button" onClick={onClickMoreBtn} disabled={isLoading}>
        {isLoading ? "Wait for it. Loading!" : "Load more"}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
