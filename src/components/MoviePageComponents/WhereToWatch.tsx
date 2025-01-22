import axios from "axios";
import React, { useEffect, useState } from "react";

interface WhereToWatchProps {
  movieId: string;
}

interface Platforms {
  name: string;
  platform_image_path: string;
  website_url: string;
}

const WhereToWatch: React.FC<WhereToWatchProps> = ({ movieId }) => {
  const [platforms, setPlatforms] = useState<Platforms[]>([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await axios.get(`/api/movies/${movieId}/platforms`);

      setPlatforms(response.data);
    };

    fetchPlatforms();
  }, [movieId]);

  return (
    <div className="wtw-item-container grid grid-cols-2 gap-4 mx-4 mt-4 cursor-pointer">
      {platforms.map((platform, index) => (
        <div
          className="second-container flex flex-row items-center gap-2"
          key={index}
          onClick={() => window.open(platform.website_url, "_blank")}
        >
          <img
            src={`http://localhost:8000/${platform.platform_image_path}`}
            alt={platform.name}
            className="w-[20px] sm:w-[50px] rounded-[5px] sm:rounded-[10px]"
          />
          <p className="text-sm hover:text-accent2">{platform.name}</p>
        </div>
      ))}
    </div>
  );
};

export default WhereToWatch;
