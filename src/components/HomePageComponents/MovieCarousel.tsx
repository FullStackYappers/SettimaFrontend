import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  release_year: number;
  runtime: number;
  description: string;
  rate_avg: number;
  imageUrl?: string;
}

//dont ask me what any of this means, not for now atleast.
const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Movie[]) => {
        setMovies(data.slice(0, 12));
      })
      .catch((error: Error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  return (
    //daisyUI element. still need to implement arrows to navigate
    <div className="movieslist carousel carousel-center flex gap-8">
      {movies.map((movie) => (
        <div className="carousel-item flex flex-col items-center justify-center">
          <Link to={`/movie/${movie.id}`}>
            <img src={movie.imageUrl} alt={movie.title} />
          </Link>
          <h3 className="movie-title">{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieCarousel;
