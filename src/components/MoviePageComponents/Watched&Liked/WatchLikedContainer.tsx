import { useEffect, useState } from "react";
import Watched from "./RatingTable/RatingTable";
import Liked from "./Liked";

interface ContainerProps {
  movieId: string;
}

const Container: React.FC<ContainerProps> = ({ movieId }) => {
  const [watched, setWatched] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!watched) {
      setLiked(false);
    }
  }, [watched]);

  return (
    <div className="watched flex justify-center gap-3 items-center mx-2">
      <Watched watched={watched} setWatched={setWatched} movieId={movieId} />
      <Liked watched={watched} liked={liked} setLiked={setLiked} />
    </div>
  );
};

export default Container;
