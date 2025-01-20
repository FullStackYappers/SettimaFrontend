import axios from "axios";
import { useEffect, useState } from "react";

interface Movie {
  runtime: number;
}

const StatsDisplay = () => {
  const authToken = localStorage.getItem("auth_token");
  const [watchTime, setWatchTime] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [average, setAverage] = useState(0);

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

          const totalMinutes = watchedMovies.reduce(
            (sum: number, entry: { movie: Movie }) => sum + entry.movie.runtime,
            0
          );
          setWatchTime(totalMinutes);
          setMovieCount(watchedMovies.length);
        } catch (error) {
          console.error("Error fetching watched status:", error);
        }
      };

      const fetchUserRatings = async () => {
        try {
          const response = await axios.get(`/api/user/ratings`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const userRatings = response.data.data;

          const categories = [
            "acting",
            "plot",
            "music",
            "costume_design",
            "cinematography",
            "editing",
          ];

          const averages = userRatings.map((movieRatings) => {
            //too lazy to make an interface to clear the error
            const total = categories.reduce(
              (sum, category) => sum + Number(movieRatings[category] / 2 || 0),
              0
            );
            return total / 12;
          });

          console.log(averages);

          const mean = Number(
            (
              averages.reduce((sum: number, avg: number) => sum + avg, 0) /
              averages.length
            ).toFixed(2)
          );

          setAverage(mean);
        } catch (error) {
          console.error("Error fetching watched status:", error);
        }
      };

      fetchWatchedMovies();
      fetchUserRatings();
    }
  }, []);

  return (
    <div className="stats-container grid grid-rows-auto w-full">
      <div className="row-start-1 w-full px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-base-100 border-x-[20px] border-accent2 rounded-t-custom mt-4"></div>
        <div className="relative grid grid-cols-3 w-full mx-auto text-center font-bold text-6xl py-2">
          <div>{movieCount}</div>
          <div>
            {watchTime >= 1400
              ? `${Math.floor(watchTime / 1440)}`
              : `${Math.floor(watchTime / 60)}`}
          </div>
          <div>{average >= 0 ? average : 0}</div>
        </div>
      </div>
      <div className="row-start-2 bg-accent2 rounded-b-custom w-full px-4 py-1 text-xs relative">
        <div className="grid grid-cols-3 mx-auto text-center font-semibold">
          <div>Total Movies</div>
          <div>{watchTime >= 1440 ? "Days Watched" : "Hours Watched"}</div>
          <div>Mean Score</div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
