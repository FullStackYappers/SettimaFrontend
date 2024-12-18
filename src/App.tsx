import "./App.css";

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

//react-router
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
            <Route path="/user" element={<ProfilePage />}></Route>
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
