const DropdownFavorites = () => {
  return (
    <li>
      <div className="collapse collapse-arrow border-none rounded-custom hover:bg-accent focus:bg-accent pt-4 mb-20">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium text-left">
          Your Favorites
        </div>
        <ul className="collapse-content">
          <li className="hover:text-accent2">
            <a href="#">Favorite Movies</a>
          </li>
          <li className="hover:text-accent2">
            <a href="#">Favorite TV Series</a>
          </li>
          <li className="hover:text-accent2">
            <a href="#">Favorite Actors</a>
          </li>
          <li className="hover:text-accent2">
            <a href="#">Favorite Directors</a>
          </li>
          <li className="hover:text-accent2">
            <a href="#">Favorite Composers</a>
          </li>
          <li className="hover:text-accent2">
            <a href="#">More...</a>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownFavorites;
