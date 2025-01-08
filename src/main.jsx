import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import App from "./App.jsx";
import MovieProvider from "./context/MovieProvider/MovieProvider.jsx";
import { Toaster } from "react-hot-toast";
import React from "react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <App />
        <Toaster />
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>
);
