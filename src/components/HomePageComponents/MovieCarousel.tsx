import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

//dont ask me what any of this means, not for now atleast.
const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!isMounted.current) {
        {
          /*
          https://www.reddit.com/r/reactjs/comments/15s1p0q/comment/jwbsd7x/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
          according to this comment it works but it doesnt really but i think this is just a dev thing, if you go apparently go to production, it's not an issue
          so this is my temporary solution for now
          also reminder that what's new needs to be sorted by newest movies, not random so i have to fix that :)
          */
        }
        try {
          const response = await fetch("http://localhost:8002/api/movies");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data: Movie[] = await response.json();
          console.log("Setting movies:", data.slice(0, 12));
          setMovies(data.slice(0, 12));
        } catch (error: any) {
          console.error("Error fetching data:", error.message as Error);
        }
      }
      console.log("Api called");
    };

    fetchMovies();
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
                  src={`http://localhost:8002/${movie.poster_path}`}
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
