import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//rounded-custom bg-secondary w-full h-full flex justify-center items-center mx-2

const Genres = () => {
  const { movieId } = useParams();
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/${movieId}/genres`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGenres(data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message as Error);
      }
    };
    fetchGenres();
  }, [movieId]);

  return (
    <div className="genres text-base sm:text-xl lg:text-2xl font-semibold">
      {genres[0] && (
        <Link
          to={`/movies/genres/${genres[0].toLowerCase()}`}
          className="w-full mx-2"
        >
          <div className="genre-box rounded-custom bg-secondary w-full h-full flex justify-center items-center mx-2 hover:text-accent2">
            {genres[0]}
          </div>
        </Link>
      )}
      {genres[1] && (
        <Link
          to={`/movies/genres/${genres[1].toLowerCase()}`}
          className="w-full mx-2"
        >
          <div className="genre-box rounded-custom bg-secondary w-full h-full flex justify-center items-center mx-2 hover:text-accent2">
            {genres[1]}
          </div>
        </Link>
      )}
    </div>
  );
};

export default Genres;
