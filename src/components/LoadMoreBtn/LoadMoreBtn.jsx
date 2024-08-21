import css from "./LoadMoreBtn.module.css";

export const LoadMoreBtn = ({ onClickMoreBtn, isLoading }) => {
  return (
    <div>
      <button type="button" onClick={onClickMoreBtn} disabled={isLoading}>
        {isLoading ? "Wait for it. Loading!" : "Load more"}
      </button>
    </div>
  );
};
