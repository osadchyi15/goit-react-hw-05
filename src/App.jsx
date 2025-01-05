import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import Navigation from "./components/Navigation/Navigation";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import SearchForm from "./components/SearchForm/SearchForm";

function App() {
  return (
    <>
      {/* <Navigation /> */}
      {/* <SearchForm /> */}
      <HomePage />
      {/* <MoviesPage /> */}
      <MovieDetailsPage />
    </>
  );
}

export default App;
