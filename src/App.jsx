import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./components/pages/HomePage/HomePage";
import MoviesPage from "./components/pages/MoviesPage/MoviesPage";
import Navigation from "./components/Navigation/Navigation";
import MovieDetailsPage from "./components/pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";

import "./App.css";

function App() {
  return (
    <div>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
