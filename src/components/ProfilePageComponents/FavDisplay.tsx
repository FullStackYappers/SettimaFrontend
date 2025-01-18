import { Link, useNavigate } from "react-router-dom";

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

interface FavDisplayProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  watchedMoviesLength: number;
  likedMovies: FavoriteMovies[];
}

const FavDisplay: React.FC<FavDisplayProps> = ({
  setActiveTab,
  watchedMoviesLength,
  likedMovies,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (watchedMoviesLength > 0) {
      setActiveTab("tab2");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="fav-container grid grid-rows-auto">
      <div className="row-start-1 px-4 relative">
        <div className="absolute inset-0 bg-base-100 border-x-[20px] border-accent2 rounded-t-custom mt-8 w-full"></div>
        <div className="flex flex-cols py-4 px-4 gap-4 justify-evenly relative">
          {likedMovies.length > 0 ? (
            likedMovies.slice(0, 3).map((favorite) => (
              <Link to={`/movie/${favorite.movie.id}`}>
                <img
                  src={`http://localhost:8000/${favorite.movie.poster_path}`}
                  alt={favorite.movie.title}
                  className="rounded-custom w-[200px]"
                />
              </Link>
            ))
          ) : (
            <div className="w-full">
              <button
                onClick={handleButtonClick}
                className="btn btn-secondary w-full h-[200px] flex items-center justify-center rounded-custom"
              >
                <span className="font-semibold text-2xl">
                  Add your favorite movies!
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="row-start-2 bg-accent2 rounded-b-custom w-full px-4 py-1 text-xs relative">
        <div className="mx-auto text-center font-semibold">
          <div>Favorites </div>
        </div>
      </div>
    </div>
  );
};

export default FavDisplay;
