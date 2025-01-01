//Test image
//import movieImg from "../assets/movieImg.jpg";
//Styles
import "./css/MoviePage.css";

//Components
import Navbar from "../components/Navbar/Navbar";
import TabLeft from "../components/MoviePageComponents/TabLeft";
import TabRight from "../components/MoviePageComponents/TabRight";
import WatchedLikedContainer from "../components/MoviePageComponents/Watched&Liked/WatchLikedContainer";
import Boxes from "../components/MoviePageComponents/Boxes";
import KeyStaff from "../components/MoviePageComponents/KeyStaff";
import Genres from "../components/MoviePageComponents/Genres";
import TrailerBtn from "../components/MoviePageComponents/WatchTrailerBtn/WatchTrailerBtn";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  release_year: number;
  runtime: number;
  description: string;
  rate_avg: number;
  poster_path: string;
}

const MoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie>({} as Movie);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/${movieId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const movieData = await response.json();
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return (
    <>
      <Navbar />
      <div className="movie-grid-container mx-4 mt-4 text-primary">
        <div className="trailerbtn">
          <TrailerBtn />
        </div>
        <div className="movieImg">
          <img
            src={`http://localhost:8000/${movie.poster_path}`}
            alt="movieImg"
          />
        </div>
        <div className="title heading-font">
          <h1 className="m0 font-outfit text-7xl font-semibold">
            {movie.title}
          </h1>
        </div>
        <Genres />
        <div className="description m0 text-lg">{movie.description}</div>
        <Boxes />
        <WatchedLikedContainer />
        <TabLeft />
        <TabRight />
        <KeyStaff />
      </div>
    </>
  );
};

export default MoviePage;
