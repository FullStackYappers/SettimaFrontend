import { Link } from "react-router-dom";

const DropDownGenre = () => {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Fantasy",
    "Horror",
    "Romance",
  ];

  return (
    <li>
      <div className="collapse collapse-arrow border-none rounded-custom hover:bg-accent focus:bg-accent pt-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Genres</div>
        <ul className="collapse-content">
          {genres.map((genre) => (
            <li className="hover:text-accent2">
              <Link to={`/movies/genres/${genre.toLowerCase()}`}>{genre}</Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DropDownGenre;
