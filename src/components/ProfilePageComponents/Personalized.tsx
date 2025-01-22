import FavDisplay from "./FavDisplay";
import StatsDisplay from "./StatsDisplay";

interface PersonalizedProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  watchedMoviesLength: number;
  likedMovies: FavoriteMovies[];
}

interface FavoriteMovies {
  id: number;
  movie_id: number;
  movie: Movie;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Personalized: React.FC<PersonalizedProps> = ({
  setActiveTab,
  watchedMoviesLength,
  likedMovies,
}) => {
  return (
    <div className="personal-container flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
      <div className="w-full mt-4 md:mt-0 md:w-1/2 flex-grow">
        <StatsDisplay />
      </div>
      <div className="w-full md:w-1/2 flex-grow">
        <FavDisplay
          setActiveTab={setActiveTab}
          watchedMoviesLength={watchedMoviesLength}
          likedMovies={likedMovies}
        />
      </div>
    </div>
  );
};

export default Personalized;
