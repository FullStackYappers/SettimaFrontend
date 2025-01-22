import axios from "axios";

interface LikedProps {
  watched: boolean;
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  movieId: string;
}

const Liked = ({ watched, liked, setLiked, movieId }: LikedProps) => {
  const authToken = localStorage.getItem("auth_token");

  const handleLikeToggle = async () => {
    if (!watched) {
      return;
    }

    try {
      if (liked) {
        await axios.delete(`/api/movies/${movieId}/favorite`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } else {
        await axios.post(`/api/movies/${movieId}/favorite`, null, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }

      setLiked((prev) => !prev);
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  console.log(liked);

  return (
    <div className="likebtn h-full">
      <button
        onClick={handleLikeToggle}
        className={`btn btn-secondary rounded-custom likedbtn ${
          watched
            ? liked
              ? "text-accent2"
              : "text-primary"
            : "cursor-inactive opacity-50"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={watched ? (liked ? "currentColor" : "none") : "none"}
          viewBox="0 0 24 24"
          className="inline-block h-7 w-7 2xl:h-6 2xl:w-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Liked;
