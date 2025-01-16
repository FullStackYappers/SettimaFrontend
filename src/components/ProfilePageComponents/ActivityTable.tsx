import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface WatchHistory {
  id: number;
  movie: Movie;
  created_at: string;
}

const ActivityTable = () => {
  const authToken = localStorage.getItem("auth_token");
  const [watchedMovies, setWatchedMovies] = useState<WatchHistory[]>([]);

  useEffect(() => {
    if (authToken) {
      const fetchWatchedMovies = async () => {
        try {
          const response = await axios.get(`/api/user/watch-history`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setWatchedMovies(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.error("Error fetching watched status:", error);
        }
      };

      fetchWatchedMovies();
    }
  }, []);

  return (
    <div>
      <div className="my-4">
        <span className="text-sm font-semibold">Activity</span>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {watchedMovies.length > 0 ? (
          watchedMovies.map((history) => (
            <div className="bg-accent rounded-[10px] relative">
              <Link to={`/movie/${history.movie.id}`}>
                <div className="flex flex-row items-center">
                  <img
                    src={`http://localhost:8000/${history.movie.poster_path}`}
                    alt={`http://localhost:8000/${history.movie.title}`}
                    className="h-[100px] rounded-[10px]"
                  />
                  <span className="text-base text-center flex-1">
                    Watched{" "}
                    <span className="font-semibold">{history.movie.title}</span>
                  </span>
                  <div className="timestamp absolute top-0 right-4 text-[10px]">
                    <span>{dayjs(history.created_at).fromNow()}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center">
            <p>No activity yet. Start watching movies!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTable;
