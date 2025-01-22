import React, { useEffect, useState } from "react";
import Personalized from "./Personalized";
import ActivityTable from "./ActivityTable";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface WatchedMovies {
  id: number;
  movie: Movie;
  created_at: string;
}

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

interface Review {
  movie: Movie;
  review: string;
}

const TabContent = () => {
  const authToken = localStorage.getItem("auth_token");
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovies[]>([]);
  const [likedMovies, setLikedMovies] = useState<FavoriteMovies[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

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

      const fetchReview = async () => {
        try {
          const response = await axios.get(`/api/user/ratings`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          });

          const reviews = response.data.data;

          console.log(reviews);

          setReviews(reviews);
        } catch (error) {
          console.error("Error fetching user ratings:", error);
        }
      };

      fetchWatchedMovies();
      fetchLikedMovies();
      fetchReview();
    }
  }, []);

  const handleButtonClick = () => {
    if (watchedMovies.length > 0) {
      setActiveTab("tab2");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="tab-section-left overflow-visible rounded-custom w-full">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 justify-evenly w-full font-semibold">
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
            <Personalized
              setActiveTab={setActiveTab}
              watchedMoviesLength={watchedMovies.length}
              likedMovies={likedMovies}
            />
            <div className="activity mt-4 text-xl">
              <ActivityTable watchedMovies={watchedMovies} />
            </div>
          </div>
        )}
        {activeTab === "tab2" && (
          <div id="tab2" className="tab-content block mb-4 flex justify-center">
            <div className="container mt-4 grid grid-cols-3 md:grid-cols-6 gap-8">
              {watchedMovies.map((movie, index) => (
                <div key={index} className="movieContainer text-primary">
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
            <div className="grid gap-4 mt-4">
              {reviews.length === 0 ? (
                <div className="w-full">
                  <button
                    onClick={handleButtonClick}
                    className="btn btn-secondary w-full h-[200px] flex items-center justify-center rounded-custom"
                  >
                    <span className="font-semibold text-2xl">
                      Review movies you've watched!
                    </span>
                  </button>
                </div>
              ) : (
                <>
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="p-8 bg-secondary mx-8 rounded-custom"
                    >
                      <div className="flex flex-row">
                        <img
                          src={`http://localhost:8000/${review.movie.poster_path}`}
                          alt={review.movie.title}
                          className="h-[150px] rounded-[10px]"
                          onClick={() => navigate(`/movie/${review.movie.id}`)}
                        />
                        <div className="mx-8">
                          <Link to={`/movie/${review.movie.id}`}>
                            <h2 className="m-0 font-semibold text-2xl text-accent2">
                              {review.movie.title}
                            </h2>
                          </Link>
                          <p className="py-4 text-base m-0 w-full">
                            {review.review.split("\n").map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabContent;
