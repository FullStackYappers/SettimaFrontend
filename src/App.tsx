import "./App.css";
import { AuthProvider } from "./context/AuthContext";

//need useEffect to remove index.html content and reactDOM to give it control of the app
//and tell it where to load the content (under .root)
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

//context because searchbutton and navbar needed it and i didnt want pass down props multiple times
//(also trying out something new)
import StickyProvider from "./context/Sticky";

//pages
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import PersonPage from "./pages/PersonPage.tsx";
import ForumPage from "./pages/ForumPage.tsx";
import MovieGenrePage from "./pages/MovieGenrePage.tsx";

//react-router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArtSortedPage from "./pages/ArtSortedPage.tsx";
import ReviewPage from "./pages/ReviewPage.tsx";

function App() {
  useEffect(() => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
      preloader.style.display = "none";
    }

    //auth is a bit weird so this forces you to become a guest user
    /*const handleBeforeUnload = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("auth_token");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };*/
  }, []);

  return (
    <AuthProvider>
      <Router>
        <StickyProvider
          content={
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:movieId" element={<MoviePage />} />
              <Route path="/movies/:movieId/reviews" element={<ReviewPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/user/:username" element={<ProfilePage />}></Route>
              <Route path={"/register"} element={<RegisterPage />}></Route>
              <Route path={"/landing"} element={<LandingPage />}></Route>
              <Route path="/person/:personId" element={<PersonPage />} />
              <Route
                path="/movies/genres/:genre"
                element={<MovieGenrePage />}
              />
              <Route path="/movies/arts/:art" element={<ArtSortedPage />} />
              <Route
                path="/forum/:discussionId"
                element={<ForumPage />}
              ></Route>
            </Routes>
          }
        />
      </Router>
    </AuthProvider>
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
