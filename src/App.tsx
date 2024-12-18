import "./App.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import StickyProvider from "./context/Sticky";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
  }, []);

  return (
    <Router>
      <StickyProvider
        content={
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie" element={<MoviePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        }
      />
    </Router>
  );
}

//needed to take over the dom and render the elements as index.html has static content
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
