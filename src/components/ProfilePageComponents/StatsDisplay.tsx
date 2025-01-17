import axios from "axios";
import { useEffect, useState } from "react";

interface Movie {
  runtime: number;
}

const StatsDisplay = () => {
  const authToken = localStorage.getItem("auth_token");
  const [watchTime, setWatchTime] = useState(0);
  const [movieCount, setMovieCount] = useState(0);

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

      fetchWatchedMovies();
    }
  }, []);

  return (
    <div className="stats-container grid grid-rows-auto w-full">
      <div className="row-start-1 w-full px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-base-100 border-x-[20px] border-accent2 rounded-t-custom mt-4"></div>
        <div className="relative grid grid-cols-3 w-full mx-auto text-center font-bold text-4xl py-2">
          <div>{movieCount}</div>
          <div>
            {watchTime >= 1400
              ? `${Math.floor(watchTime / 1440)}`
              : `${Math.floor(watchTime / 60)}`}
          </div>
          <div>3.69</div>
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
