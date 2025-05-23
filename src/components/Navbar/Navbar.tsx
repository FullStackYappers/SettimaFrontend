import Search from "./Search";
import { useState } from "react";
import logoName from "../../assets/nameLogo.png";
import { useSticky } from "../../context/Sticky";
import { Link } from "react-router-dom";
import DropdownGenre from "./DropdownGenre.tsx";
import DropdownProfile from "./DropdownProfile.tsx";
import DropdownArts from "./DropdownArts.tsx";
import DropdownFavorites from "./DropdownFavorites.tsx";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext.tsx";

const Navbar = () => {
  const [showSearchButton, setShowSearchButton] = useState(false);
  const toggleSearch = () => {
    setShowSearchButton(!showSearchButton);
  };

  const { user } = useAuth();
  const authToken = localStorage.getItem("auth_token");

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
              : "navbar not-stuck relative bg-accent rounded-custom my-4 w-[95%] md:w-[97%] xl:w-90p h-navbar-height mx-auto"
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
                <ul className="menu bg-base-100 text-primary rounded-r-custom min-h-full min-[330px]:w-80 w-60 p-4">
                  <div className="flex-none mx-auto">
                    <Link to="/">
                      <img
                        src={logoName}
                        width={150}
                        alt="Settima"
                        className="my-6"
                      />
                    </Link>
                  </div>
                  <div className="divider divider-accent"></div>
                  <DropdownGenre />
                  <DropdownArts />
                  {authToken && <DropdownFavorites />}
                </ul>
                <div className="fixed min-[330px]:w-80 w-60 bottom-0 bg-gradient-to-t from-base-100 via-base-100 to-white-0 px-4">
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
              <img
                src={logoName}
                alt="Settima"
                className="min-[320px]:w-[120px] w-[90px]"
              />
            </Link>
          </div>
          <div className="profilebtn flex-end mr-4">
            <div className="dropdown dropdown-hover dropdown-end">
              <Link to={authToken ? `/user/${user?.username}` : "/login"}>
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
              <DropdownProfile />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
