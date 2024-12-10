import { useEffect, useState } from "react";
import Watched from "./RatingTable/RatingTable";
import Liked from "./Liked";

const Container = () => {
  const [watched, setWatched] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!watched) {
      setLiked(false);
    }
  }, [watched]);

  return (
    <div className=" watched flex items-center mx-2">
      <Watched watched={watched} setWatched={setWatched} />
      <Liked watched={watched} liked={liked} setLiked={setLiked} />
    </div>
  );
};

export default Container;
