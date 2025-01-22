import "./css/PersonPage.css";
import Navbar from "../components/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../services/api/MoviesApi";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface Person {
  id: number;
  name: string;
  dob: string;
  biography: string;
  image_path: string;
  movies: Movie[];
}

const PersonPage = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchPersonData = async () => {
      const response = await fetch(
        `http://localhost:8000/api/person/${personId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setPerson({
        id: data.id,
        name: data.name,
        dob: data.birthday,
        biography: data.biography,
        image_path: data.image_path,
        movies: [],
      });

      const movies: Movie[] = [];

      if (data.cast && data.cast.length > 0) {
        for (let movie of data.cast) {
          const movieData = await fetchMovieById(movie.movie_id);
          if (
            !movies.some((existingMovie) => existingMovie.id === movie.movie_id)
          ) {
            movies.push(movieData);
          }
        }
      }

      if (data.crew && data.crew.length > 0) {
        for (let movie of data.crew) {
          const movieData = await fetchMovieById(movie.movie_id);
          if (
            !movies.some((existingMovie) => existingMovie.id === movie.movie_id)
          ) {
            movies.push(movieData);
          }
        }
      }

      setPerson((prevState) => ({
        ...prevState!,
        movies: movies,
      }));
    };

    fetchPersonData();
  }, [personId]);

  if (!person) {
    return (
      <div id="preloader">
        <div className="image">
          <img src="/combWhite.svg" alt="preloader" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="person-grid-container text-primary mx-4 mt-10">
        <div className="personImg rounded-custom">
          <img
            src={`http://localhost:8000/${person.image_path}`}
            alt="personImg"
          />
        </div>
        <div className="personName font-outfit">
          <h2 className="text-[30px] min-[500px]:text-[50px] md:text-7xl">
            {person.name}
          </h2>
          <p className="ml-1">{person.dob}</p>
        </div>
        <p className="personBio m-0 p-0">{person.biography}</p>
      </div>
      <div className="moviesList text-primary mx-4 mt-10">
        <h2 className="title font-outfit text-[30px] min-[500px]:text-[50px] md:text-7xl">
          Movies They Were In
        </h2>
        <div className="moviesContainer mt-4">
          {person.movies.map((movie) => (
            <div className="movieContainer text-primary">
              <Link to={`/movie/${movie.id}`}>
                <img src={`http://localhost:8000/${movie.poster_path}`} />
              </Link>
              <Link to={`/movie/${movie.id}`}>
                <p className="mt-2 font-semibold">{movie.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PersonPage;
