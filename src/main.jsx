import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import App from "./App.jsx";
import MovieProvider from "./context/MovieProvider/MovieProvider.jsx";

createRoot(document.getElementById("root")).render(
  <MovieProvider>
    <App />
  </MovieProvider>
);
