import { useSticky } from "../../context/Sticky";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const SearchResults: React.FC<{ results: Movie[] }> = ({ results }) => {
  if (results.length <= 0) {
    return null;
  }

  const sticky = useSticky();

  return (
    <div
      className={`search-results w-full min-h-auto max-h-[75vh] bg-accent flex flex-col overflow-y-auto scrollbar-hidden gap-4 ${
        sticky ? "" : "rounded-custom mt-4"
      }`}
    >
      {results.map((movie, index) => (
        <a href={`/movie/${movie.id}`}>
          <div
            className={`flex items-center flex-row pl-10 gap-4 opacity-80 hover:opacity-100 ${
              index === 0 ? "pt-4" : 0
            } ${index === results.length - 1 ? "pb-4" : 0}`}
            key={movie.id}
          >
            <img
              className="w-16 h-auto object-cover rounded-[15px]"
              src={`http://localhost:8000/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SearchResults;
