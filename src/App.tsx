import "./App.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import StickyProvider from "./context/Sticky";
import MoviePage from "./pages/MoviePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
            <Route path="/" element={<MoviePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        }
      />
    </Router>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
