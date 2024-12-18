import "./css/HomePage.css";

import Navbar from "../components/Navbar/Navbar";
import MovieCarousel from "../components/HomePageComponents/MovieCarousel";

import { useEffect, useState } from "react";

const HomePage = () => {
  const randGenre = [
    "Action",
    "Adventure",
    "Comedy",
    "Romance",
    "Horror",
    "Drama",
    "Fiction",
  ];
  const [currentGenre, setCurrentGenre] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randGenre.length);
    setCurrentGenre(randGenre[randomIndex]);
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-grid-container mx-4 mt-8 text-primary">
        <div className="whats-new grid grid-auto-rows gap-4">
          <h2 className="font-outfit text-3xl">What's New</h2>
          <MovieCarousel />
        </div>
        <div className="top-picks grid grid-auto-rows gap-4">
          <h2 className="font-outfit text-3xl">Top Picks for you</h2>
          <MovieCarousel />
        </div>
        <div className="randgenre grid grid-auto-rows gap-4">
          <h2 className="font-outfit text-3xl">{currentGenre}</h2>
          <MovieCarousel />
        </div>
      </div>
    </>
  );
};

export default HomePage;
