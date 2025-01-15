import { useEffect, useState } from "react";
import { movie } from "../../types/Movie";
import axios from "axios";

const FavDisplay = () => {
  const [likedMovies, setLikedMovies] = useState([]);
  const authToken = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const response = await axios.get(`/api/user/favorites`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setLikedMovies(response.data.data);
        console.log("Favorite movies", response.data.data);
      } catch (error) {
        console.error("Error fetching watched status:", error);
      }
    };

    fetchLikedMovies();
  });

  return (
    <div className="fav-container grid grid-rows-auto">
      <div className="row-start-1 px-4 relative">
        <div className="absolute inset-0 bg-base-100 border-x-[20px] border-accent2 rounded-t-custom mt-8 w-full"></div>
        <div className="grid grid-cols-3 py-4 px-4 gap-4 place-items-stretch relative">
          <img
            src="../../../src/assets/movieImg.jpg"
            alt=""
            className="rounded-custom"
          />
          <img
            src="../../../src/assets/movieImg.jpg"
            alt=""
            className="rounded-custom"
          />
          <img
            src="../../../src/assets/movieImg.jpg"
            alt=""
            className="rounded-custom"
          />
        </div>
      </div>
      <div className="row-start-2 bg-accent2 rounded-b-custom w-full px-4 py-1 text-xs relative">
        <div className="mx-auto text-center font-semibold">
          <div>Favorites </div>
        </div>
      </div>
    </div>
  );
};

export default FavDisplay;
