import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchRandomMovies } from "../../services/api/MoviesApi.ts";
import { Movie } from "../../types/Movie.ts";

const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    const loadMovies = async () => {
      if (!isMounted.current) {
        try {
          const data = await fetchRandomMovies(12);
          console.log("Setting movies:", data);
          setMovies(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    loadMovies();
    isMounted.current = true;
  }, []);

  const handleImageLoad = () => {
    console.log("image loaded");
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

export default MovieCarousel;
