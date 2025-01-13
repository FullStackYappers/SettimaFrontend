import "./css/PersonPage.css";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../services/api/MoviesApi";
import { Link, useParams } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MovieGenrePage = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (genre) {
          const response = await fetchMoviesByGenre(genre);
          setMovies(response);
        }
      } catch (error) {
        console.error(
          "Error fetching latest movies:",
          error instanceof Error ? error.message : String(error)
        );
        setMovies([]);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchMovies();
  }, [genre]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // Wait for all images to load before hiding preloader
  useEffect(() => {
    if (imagesLoaded === movies.length * 2 && movies.length > 0) {
      setLoading(false); // Set loading to false once all images are loaded
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
      <div className="moviesList text-primary mx-4 mt-10">
        <h2 className="title font-outfit text-4xl">{genre}</h2>
        <div className="moviesContainer mt-4">
          {movies.map((movie) => (
            <div className="movieContainer text-primary">
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

export default MovieGenrePage;
