import { Link } from "react-router-dom";
const DropdownArts = () => {
  const arts = [
    "Acting",
    "Plot",
    "Music",
    "Costume Design",
    "Cinematography",
    "Editing",
  ];

  return (
    <li>
      <div className="collapse collapse-arrow border-none rounded-custom hover:bg-accent focus:bg-accent pt-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">The Arts</div>
        <ul className="collapse-content">
          {arts.map((art) => (
            <li className="hover:text-accent2">
              <Link
                to={`/movies/arts/${art.replace(/\s+/g, "_").toLowerCase()}`}
              >
                Ranked by {art}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DropdownArts;
