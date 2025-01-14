import { useEffect, useState } from "react";
import Watched from "./RatingTable/RatingTable";
import Liked from "./Liked";
import axios from "axios";

interface ContainerProps {
  movieId: string;
  handleAverage: () => void;
  review: string;
  setReview: (review: string) => void;
}

const Container: React.FC<ContainerProps> = ({
  movieId,
  handleAverage,
  review,
  setReview,
}) => {
  const [watched, setWatched] = useState(false);
  const [liked, setLiked] = useState(false);
  const authToken = localStorage.getItem("auth_token");

  useEffect(() => {
    if (authToken) {
      const fetchWatchedStatus = async () => {
        try {
          const response = await axios.get(`/api/user/watch-history`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          console.log(response.data);

          const isWatched = response.data.data.some(
            (entry: any) => entry.movie.id === Number(movieId)
          );
          setWatched(isWatched);
        } catch (error) {
          console.error("Error fetching watched status:", error);
        }
      };

      const fetchLikedStatus = async () => {
        try {
          const response = await axios.get(`/api/user/favorites`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          const isLiked = response.data.data.some(
            (entry: any) => entry.movie.id === Number(movieId)
          );
          setLiked(isLiked);
        } catch (error) {
          console.error("Error fetching watched status:", error);
        }
      };

      fetchWatchedStatus();
      fetchLikedStatus();
    }
  }, [movieId, setWatched]);

  const markAsWatched = () => {
    setWatched(true);
  };

  useEffect(() => {
    console.log("Watched status in Container:", watched);
  }, [watched]);

  return (
    <div className="watched flex justify-center gap-3 items-center mx-2">
      <Watched
        watched={watched}
        setWatched={markAsWatched}
        movieId={movieId}
        handleAverage={handleAverage}
        review={review}
        setReview={setReview}
      />
      <Liked
        watched={watched}
        liked={liked}
        setLiked={setLiked}
        movieId={movieId}
      />
    </div>
  );
};

export default Container;
