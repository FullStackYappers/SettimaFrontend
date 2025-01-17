import { useEffect, useState } from "react";
import Personalized from "./Personalized";
import ActivityTable from "./ActivityTable";
import { Link } from "react-router-dom";
import axios from "axios";

interface WatchedMovies {
  movie: Movie;
}

interface FavoriteMovie {
  movie: Movie;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const TabContent = () => {
  const authToken = localStorage.getItem("auth_token");
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovies[]>([]);
  const [likedMovies, setLikedMovies] = useState<FavoriteMovie[]>([]);

  useEffect(() => {
    if (authToken) {
      const fetchWatchedMovies = async () => {
        try {
          const response = await axios.get(`/api/user/watch-history`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const watchedMovies = response.data.data;
          setWatchedMovies(watchedMovies);
          console.log(watchedMovies);
        } catch (error) {
          console.error("Error fetching watched status:", error);
        }
      };

      const fetchLikedMovies = async () => {
        try {
          const response = await axios.get(`/api/user/favorites`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const likedMovies = response.data.data || [];
          setLikedMovies(likedMovies);
        } catch (error) {
          console.error("Error fetching watched status:", error);
        }
      };

      fetchWatchedMovies();
      fetchLikedMovies();
    }
  }, []);

  return (
    <div className="tab-section-left overflow-visible rounded-custom w-full">
      <div className="flex justify-between gap-1 font-semibold">
        <button
          className={`rounded-custom hover:text-accent2 text-2xl ${
            activeTab === "tab1" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Overview
        </button>
        <button
          className={`rounded-custom hover:text-accent2 ${
            activeTab === "tab2" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Movie List
        </button>
        <button
          className={`rounded-custom hover:text-accent2 ${
            activeTab === "tab3" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab3")}
        >
          Favorites
        </button>
        <button
          className={`rounded-custom hover:text-accent2 ${
            activeTab === "tab4" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab4")}
        >
          Social
        </button>
        <button
          className={`rounded-custom hover:text-accent2 ${
            activeTab === "tab5" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab5")}
        >
          Reviews
        </button>
      </div>

      <div className="mt-4 text-2xl">
        {activeTab === "tab1" && (
          <div id="tab1" className="tab-content block mb-4">
            <Personalized />
            <div className="activity mt-4 text-xl">
              <ActivityTable />
            </div>
          </div>
        )}
        {activeTab === "tab2" && (
          <div id="tab2" className="tab-content block mb-4 flex justify-center">
            <div className="container mt-4 grid grid-cols-6 gap-8">
              {watchedMovies.map((movie) => (
                <div className="movieContainer text-primary">
                  <Link to={`/movie/${movie.movie.id}`}>
                    <img
                      src={`http://localhost:8000/${movie.movie.poster_path}`}
                      alt={movie.movie.title}
                    />
                  </Link>
                  <Link to={`/movie/${movie.movie.id}`}>
                    <p className="mt-2 text-sm font-semibold">
                      {movie.movie.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "tab3" && (
          <div id="tab3" className="tab-content block mb-4 flex justify-center">
            <div className="container mt-4 grid grid-cols-6 gap-8">
              {likedMovies.map((movie) => (
                <div className="movieContainer text-primary">
                  <Link to={`/movie/${movie.movie.id}`}>
                    <img
                      src={`http://localhost:8000/${movie.movie.poster_path}`}
                      alt={movie.movie.title}
                    />
                  </Link>
                  <Link to={`/movie/${movie.movie.id}`}>
                    <p className="mt-2 text-sm font-semibold">
                      {movie.movie.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "tab4" && (
          <div id="tab4" className="tab-content block mb-4">
            Stuff will come / tba
          </div>
        )}
        {activeTab === "tab5" && (
          <div id="tab5" className="tab-content block mb-4">
            Stuff will come / tba
          </div>
        )}
      </div>
    </div>
  );
};

export default TabContent;
