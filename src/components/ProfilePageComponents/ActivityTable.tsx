import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface WatchedMovies {
  id: number;
  movie: Movie;
  created_at: string;
}

interface ActivityTableProps {
  watchedMovies: WatchedMovies[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ watchedMovies }) => {
  return (
    <div>
      <div className="my-4">
        <span className="text-sm font-semibold">Activity</span>
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 w-full">
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
          <div className="col-span-3 xl:col-span-4">
            <Link to="/">
              <button className="btn btn-secondary w-full col-span-3 h-[150px] flex items-center justify-center rounded-custom">
                <span className="font-semibold text-2xl">
                  Add your watched movies!
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTable;
