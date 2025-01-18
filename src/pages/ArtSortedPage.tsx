import Navbar from "../components/Navbar/Navbar";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const ArtSortedPage = () => {
  const { art } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (art) {
          const response = await axios.get(`/api/movies/sorted/${art}`);
          setMovies(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching latest movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [art]);

  const capitalizeFirstLowercaseRest = (str: string | undefined) => {
    if (str) {
      return str
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
  };

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded === movies.length * 2 && movies.length > 0) {
      setLoading(false);
    }
  }, [imagesLoaded, movies.length]);

  if (loading) {
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
      <div className="moviesList text-primary mx-4 mt-8 px-3">
        <h2 className="font-outfit text-3xl">
          {capitalizeFirstLowercaseRest(art)}
        </h2>
        <div className="moviesContainer mt-4">
          {movies.map((movie, index) => (
            <div key={index} className="movieContainer text-primary">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`http://localhost:8000/${movie.poster_path}`}
                  alt={movie.title}
                  onLoad={handleImageLoad}
                />
              </Link>
              <Link to={`/movie/${movie.id}`}>
                <p className="mt-2 font-semibold">{movie.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ArtSortedPage;
