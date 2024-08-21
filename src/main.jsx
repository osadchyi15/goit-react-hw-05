import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./context/UserContext";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
);
