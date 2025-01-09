import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMoviesByGenre } from "../../services/api/MoviesApi.ts";
import { Movie } from "../../types/Movie.ts";

interface GenreMovieCarouselProps {
  genre: string;
}

const GenreMovieCarousel: React.FC<GenreMovieCarouselProps> = ({ genre }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      if (!genre) return;

      try {
        console.log("Fetching movies for genre:", genre);
        const data = await fetchMoviesByGenre(genre);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadMovies();
  }, [genre]);

  return (
    <div className="carousel-wrapper">
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

export default GenreMovieCarousel;
