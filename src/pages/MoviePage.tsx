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

import { fetchMovieById } from "../services/api/MoviesApi";
import { MoviePageFields } from "../types/Movie";
import axios from "axios";

const MoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MoviePageFields>({} as MoviePageFields);
  const [error, setError] = useState<string | null>(null);
  const [average, setAverage] = useState(0);
  const [review, setReview] = useState("");
  const authToken = localStorage.getItem("auth_token");

  const fetchRatings = async () => {
    try {
      if (authToken) {
        const response = await axios.get(`/api/user/ratings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        const ratings = response.data.data;

        const movieRatings = ratings.find(
          (rating: any) => rating.movie_id === Number(movieId)
        );

        if (movieRatings) {
          const categories = [
            "acting",
            "plot",
            "music",
            "costume_design",
            "cinematography",
            "editing",
          ];

          const total = categories.reduce(
            (sum, category) => sum + Number(movieRatings[category] || 0),
            0
          );
          const avg = total / 6;

          if (!((avg * 10) % 5 == 0)) {
            setAverage(Math.round(avg / 2));
          } else {
            setAverage(avg / 2);
          }

          if (movieRatings.review) {
            setReview(movieRatings.review);
          }
        } else {
          setAverage(0);
          setReview("");
        }
      }
    } catch (error) {
      console.error("Error fetching user ratings:", error);
    }
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!movieId) return;

      try {
        const movieData = await fetchMovieById(movieId);
        setMovie(movieData);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      }
    };

    getMovieDetails();
    fetchRatings();
  }, [movieId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie || !movieId) {
    return (
      <div id="preloader">
        <div className="image">
          <img src="/combWhite.svg" alt="preloader" />
        </div>
      </div>
    );
  }

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
            alt={movie.title}
          />
        </div>
        <div className="title heading-font">
          <h1 className="m0 font-outfit text-7xl font-semibold">
            {movie.title}
          </h1>
        </div>
        <Genres />
        <div className="description m0 text-lg">{movie.description}</div>
        <Boxes average={average} movieId={movieId} />
        <WatchedLikedContainer
          movieId={movieId}
          handleAverage={fetchRatings}
          review={review}
          setReview={setReview}
        />
        <TabLeft />
        <TabRight />
        <KeyStaff />
      </div>
    </>
  );
};

export default MoviePage;
