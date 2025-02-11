import { useEffect, useState } from "react";
import SearchButton from "./SearchButton";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../../services/api/MoviesApi.ts";
import { Movie } from "../../types/Movie.ts";

const Search: React.FC<{
  showSearchButton: boolean;
  toggleSearch: () => void;
}> = ({ showSearchButton, toggleSearch }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [searchActive, setSearchActive] = useState(false);

  const resetSearch = () => {
    setInput("");
    toggleSearch();
    setResults([]);
  };

  const fetchResults = async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const data = await searchMovies(value);
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
      // we can add an error message for the user
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchResults(value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetSearch();
      }
    };

    if (searchActive) {
      window.addEventListener("keydown", handleKeyDown);
      console.log(searchActive);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Cleanup listener
    };
  }, [searchActive]);

  const navigate = useNavigate();

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (results.length > 0) {
        navigate(`/movie/${results[0].id}`);
      }
    }
  };

  return (
    <div className="search-container w-full h-full">
      <SearchButton
        input={input}
        onChange={handleChange}
        showSearchButton={showSearchButton}
        toggleSearch={toggleSearch}
        resetSearch={resetSearch}
        onKeyDown={handleEnter}
        searchActive={searchActive}
        setSearchActive={setSearchActive}
      />
      <SearchResults results={results} />
    </div>
  );
};

export default Search;
