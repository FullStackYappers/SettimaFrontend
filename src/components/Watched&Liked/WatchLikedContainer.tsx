import { useState } from "react";
import Watched from "./Watched";
import WatchedLiked from "./Liked";

const WatchedContainer = () => {
  const [watched, setWatched] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleWatched = () => {
    setWatched((prev) => !prev);
    if (watched) {
      setLiked(false); // if the user unclicks watched, the show becomes unliked
    }
  };

  const handleLiked = () => {
    if (watched) {
      setLiked((prev) => !prev);
    }
  };

  return (
    <div className=" watched flex items-center mx-2">
      <Watched watched={watched} handleWatched={handleWatched} />
      <WatchedLiked watched={watched} liked={liked} handleLiked={handleLiked} />
    </div>
  );
};

export default WatchedContainer;
