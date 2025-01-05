import css from "./ToTopButton.module.css";

const ToTopButton = ({ onClickTopButton }) => {
  return (
    <button type="button" onClick={onClickTopButton} className={css.upButton}>
      &#10148;
    </button>
  );
};

export default ToTopButton;
