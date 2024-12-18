import { Link } from "react-router-dom";

const MovieCarousel = () => {
  const movies = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Movie Title ${index + 1}`,
    imageUrl: `src/assets/movieImg.jpg`,
  }));

  return (
    //daisyUI element. still need to implement arrows to navigate
    <div className="movieslist carousel carousel-center flex gap-8">
      {movies.map((movie) => (
        <div className="carousel-item flex flex-col items-center justify-center">
          <Link to="/movie">
            <img src={movie.imageUrl} alt={movie.title} />
          </Link>
          <h3 className="movie-title">{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieCarousel;
