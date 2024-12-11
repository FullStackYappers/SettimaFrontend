import "./WatchTrailerBtn.css";

const TrailerBtn = () => {
  const trailerUrl =
    "https://www.youtube.com/watch?v=ONHBaC-pfsk&ab_channel=20thCenturyStudios";
  const imgID = trailerUrl.split("v=")[1].split("&")[0];
  const imgUrl = `https://img.youtube.com/vi/${imgID}/0.jpg`;

  return (
    <div className="trailerbtn">
      <div
        className="bgtrailer"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <button
        onClick={() => window.open(trailerUrl, "_blank")}
        className="btn btn-secondary rounded-custom w-[250px] h-[100px] text-2xl absolute"
      >
        Watch Trailer
      </button>
    </div>
  );
};

export default TrailerBtn;
