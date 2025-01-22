import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//rounded-custom bg-secondary w-full h-full flex justify-center items-center mx-2

const Genres = () => {
  const { movieId } = useParams();
  const [genres, setGenres] = useState([]);

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
        <div className="rounded-custom bg-secondary w-full h-full flex justify-center items-center mx-2">
          {genres[0]}
        </div>
      )}
      {genres[1] && (
        <div className="rounded-custom bg-secondary w-full h-full flex justify-center items-center mx-2">
          {genres[1]}
        </div>
      )}
    </div>
  );
};

export default Genres;
