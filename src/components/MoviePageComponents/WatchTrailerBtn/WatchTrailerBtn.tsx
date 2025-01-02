import { useParams } from "react-router-dom";
import "./WatchTrailerBtn.css";
import { useEffect, useState } from "react";

const TrailerBtn = () => {
  const { movieId } = useParams();
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/${movieId}/trailer`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.trailer_url) {
          setTrailer(data.trailer_url);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.message as Error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  const imgUrl = trailer
    ? `https://img.youtube.com/vi/${
        trailer.split("v=")[1].split("&")[0]
      }/maxresdefault.jpg`
    : "";

  return (
    <div className="trailerbtn bg-gradient-to-t from-base-100 to-transparent inset-0">
      <div
        className="bgtrailer"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <button
        onClick={() => window.open(trailer, "_blank")}
        className="btn btn-secondary rounded-custom w-[250px] h-[100px] text-2xl absolute text-primary"
      >
        Watch Trailer
      </button>
    </div>
  );
};

export default TrailerBtn;
