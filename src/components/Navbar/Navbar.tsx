import Search from "./Search";
import { useState } from "react";
import logoName from "../../assets/nameWhite.svg";
import { useSticky } from "../../context/Sticky";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext.tsx";

const Navbar = () => {
  const [showSearchButton, setShowSearchButton] = useState(false);
  const { logout } = useAuth();
  const toggleSearch = () => {
    setShowSearchButton(!showSearchButton);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_id");
      console.log(response);
      logout();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const sticky = useSticky();

  return (
    <header>
      <div
        className={sticky ? "navbar-wrapper-stuck" : "navbar-wrapper w-full"}
      >
        <nav
          className={
            sticky
              ? "navbar stuck top-0 fixed bg-accent h-navbar-height w-full z-10"
              : "navbar not-stuck relative bg-accent rounded-custom my-4 w-90p h-navbar-height mx-auto"
          }
        >
          <div
            className={`searchButton h-navbar-height absolute ${
              showSearchButton
                ? "w-full right-0 z-10 rounded-custom"
                : "right-20"
            }`}
          >
            <Search
              showSearchButton={showSearchButton}
              toggleSearch={toggleSearch}
            />
          </div>
          <div className="flex-none ml-4">
            {/* Drawer*/}
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-ghost btn-circle hover:bg-transparent w-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="drawer-side z-10">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-100 text-primary rounded-r-custom min-h-full w-80 p-4">
                  <div className="flex-none mx-auto">
                    <Link to="/">
                      <img src={logoName} width={150} alt="Settima" />
                    </Link>
                  </div>
                  <div className="divider divider-accent"></div>
                  <li>
                    <div className="collapse collapse-arrow border-none rounded-custom hover:bg-accent focus:bg-accent pt-4">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        Genres
                      </div>
                      <ul className="collapse-content">
                        <li className="hover:text-accent2">
                          <a href="#">Action</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Adventure</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Drama</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Fiction</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Romance</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Thriller</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">More...</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="collapse collapse-arrow border-none rounded-custom hover:bg-accent focus:bg-accent pt-4">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        The Arts
                      </div>
                      <ul className="collapse-content">
                        <li className="hover:text-accent2">
                          <a href="#">Ranked by Acting</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Ranked by Plot</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Ranked by Music & Sound</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Ranked by Costume Design</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Ranked by Cinematography</a>
                        </li>
                        <li className="hover:text-accent2">
                          <a href="#">Ranked by Editing</a>
                        </li>
                      </ul>
                    </div>
                  </li>
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
                </ul>
                <div className="fixed w-80 bottom-0 bg-gradient-to-t from-base-100 via-base-100 to-white-0 px-4">
                  <div className="mb-4 relative">
                    <Link to="/login">
                      <button className="text-xl bottom-4 h-navbar-height font-bold text-accent2 btn rounded-custom hover:bg-primary h-full w-full">
                        Login / Signup
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 pl-4">
            <Link to="/">
              <img src={logoName} width={150} alt="Settima" />
            </Link>
          </div>
          <div className="profilebtn flex-end mr-4">
            <div className="dropdown dropdown-hover dropdown-end">
              <Link to="/user">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle hover:bg-transparent w-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              </Link>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-accent rounded-box z-[1] w-52 p-4 text-lg shadow text-primary"
              >
                <li className="hover:text-accent2">
                  <Link to="/user">
                    <span>Profile</span>
                  </Link>
                </li>
                <li className="hover:text-accent2">
                  <span>Settings</span>
                </li>
                <div className="divider divider-accent"></div>
                {/*idea for this is that it can only appear if the user is a guest user*/}
                <Link to="/login">
                  <li className="hover:text-accent2">
                    <span>Login / Signup</span>
                  </li>
                </Link>
                <li className="hover:text-accent2">
                  <span onClick={handleLogout}>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
