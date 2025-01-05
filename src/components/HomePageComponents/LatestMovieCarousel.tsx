import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchLatestMovies } from "../../services/api/MoviesApi.ts";
import { LatestMovie } from "../../types/Movie.ts";

const LatestMovieCarousel = () => {
  const [movies, setMovies] = useState<LatestMovie[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    const loadMovies = async () => {
      if (!isMounted.current) {
        const latestMovies = await fetchLatestMovies();
        setMovies(latestMovies);
      }
    };

    loadMovies();
    isMounted.current = true;
  }, []);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const allImagesLoaded = imagesLoaded === 12;

  useEffect(() => {
    if (allImagesLoaded) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    //need this for when the page changes ("unmounting")
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [allImagesLoaded]);

  return (
    <div className="carousel-wrapper">
      {/* Preloader*/}
      <div
        id="preloader"
        className={`${
          allImagesLoaded ? "invisible opacity-0" : "visible opacity-1"
        }`}
      >
        <div className="image">
          <img src="/combWhite.svg" alt="preloader" />
        </div>
      </div>

      {/* Movie Carousel */}
      <div className="movieslist carousel carousel-center flex gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="carousel-item grid grid-auto-rows items-center justify-center"
          >
            <div className="image-container">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`http://localhost:8000/${movie.poster_path}`}
                  alt={movie.title}
                  onLoad={handleImageLoad}
                />
              </Link>
            </div>
            <div className="title-container">
              <Link to={`/movie/${movie.id}`}>
                <h3 className="movie-title">{movie.title}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestMovieCarousel;
