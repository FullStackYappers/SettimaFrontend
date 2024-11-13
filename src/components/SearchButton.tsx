import { useSticky } from "../context/Sticky";

interface SearchButtonProps {
  toggleSearch: () => void;
  showSearchButton: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({
  toggleSearch,
  showSearchButton,
}) => {
  const sticky = useSticky();

  return (
    <form
      action=""
      className={`search h-full text-primary relative ${
        showSearchButton ? "show-search" : ""
      }`}
      id="search-bar"
    >
      <input
        type="search"
        placeholder="Search..."
        className={
          sticky
            ? "search-input text-primary h-full w-full bg-accent p-2 pl-10 no-rounded opacity-0"
            : "search-input text-primary h-full w-full bg-accent p-2 pl-10 rounded-custom opacity-0"
        }
      />
      <div
        className="search-button h-6 w-6 absolute top-0 bottom-0 right-2 m-auto cursor-pointer"
        id="search-button"
        onClick={toggleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary absolute search-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary absolute opacity-0 search-close"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </form>
  );
};

export default SearchButton;
