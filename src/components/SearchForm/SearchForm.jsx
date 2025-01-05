import { useContext } from "react";
import s from "./SearchForm.module.css";
import { movieContext } from "../../context/MovieProvider/MovieProvider";

const SearchForm = () => {
  const { setQuery, setSearchList } = useContext(movieContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.search.value);
    setQuery(e.target.elements.search.value);
    setSearchList([]);
    e.target.reset();
  };

  return (
    <div className={s.formWrapper}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.searchInput}
          placeholder="What movie are you looking?"
          type="text"
          name="search"
          autoFocus
        />
        <button className={s.searchBtn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
