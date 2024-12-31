import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface GenreMovieCarouselProps {
  genre: string;
}

const GenreMovieCarousel: React.FC<GenreMovieCarouselProps> = ({ genre }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!genre) return;

      try {
        console.log("Fetching movies for genre:", genre); // Log the genre
        const response = await fetch(
          `http://localhost:8000/api/genres/${genre}/movies`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data.movies.slice(0, 12));
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchMovies();
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
