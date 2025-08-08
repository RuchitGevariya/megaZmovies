import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { SearchProvider } from "./Context/SearchContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>
);


