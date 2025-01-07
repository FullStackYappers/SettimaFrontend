import "./css/HomePage.css";

import Navbar from "../components/Navbar/Navbar";
import MovieCarousel from "../components/HomePageComponents/MovieCarousel";
import GenreMovieCarousel from "../components/HomePageComponents/GenreMovieCarousel";
import LatestMovieCarousel from "../components/HomePageComponents/LatestMovieCarousel";

import { useEffect, useState } from "react";

const HomePage = () => {
  const randGenre = [
    "Action",
    "Crime",
    "Science Fiction",
    "Fantasy",
    "Adventure",
    "Animation",
    "Family",
    "Thriller",
    "Mystery",
    "Drama",
    "Comedy",
    "Music",
    "Romance",
    "Horror",
    "Documentary",
    "History",
    "War",
    "Western",
  ];

  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const shuffledGenres = [...randGenre].sort(() => Math.random() - 0.5);
    setGenres(shuffledGenres.slice(0, 3));
  }, []);

  return (
      <>
        <Navbar />
        <div className="home-grid-container grid grid-auto-rows mx-4 mt-8 text-primary">
          <div className="whats-new">
            <h2 className="font-outfit text-3xl m-0 p-0">What's New</h2>
            <LatestMovieCarousel />
          </div>
          <div className="top-picks">
            <h2 className="font-outfit text-3xl m-0 p-0">Top Picks for you</h2>
            <MovieCarousel />
          </div>
          {genres.map((genre) => (
              <div className="randgenre">
                <h2 className="font-outfit text-3xl">{genre}</h2>
                <GenreMovieCarousel genre={genre} />
              </div>
          ))}
        </div>
      </>
  );
};

export default HomePage;
