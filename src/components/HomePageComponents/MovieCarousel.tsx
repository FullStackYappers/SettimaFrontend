import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  release_year: number;
  runtime: number;
  description: string;
  rate_avg: number;
}

interface Poster {
  poster_url: string;
}

//dont ask me what any of this means, not for now atleast.
const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [posters, setPosters] = useState<Record<number, string>>({});

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

  useEffect(() => {
    movies.forEach((movie) => {
      fetch(`http://localhost:8000/api/movie-posters/${movie.id}`)
        .then((response) => response.json())
        .then((data: Poster) => {
          if (data.poster_url) {
            setPosters((prevPosters) => ({
              ...prevPosters,
              [movie.id]: data.poster_url,
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching poster:", error.message);
        });
    });
  }, [movies]);

  return (
    //daisyUI element. still need to implement arrows to navigate
    <div className="movieslist carousel carousel-center flex gap-8">
      {movies.map((movie) => (
        <div className="carousel-item grid grid-auto-rows items-center justify-center">
          <div className="image-container">
            <Link to={`/movie/${movie.id}`}>
              <img src={posters[movie.id]} alt={movie.title} />
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
  );
};

export default MovieCarousel;
