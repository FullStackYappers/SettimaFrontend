import "./WatchTrailerBtn.css";

const TrailerBtn = () => {
  const trailerUrl =
    "https://www.youtube.com/watch?v=ONHBaC-pfsk&ab_channel=20thCenturyStudios";
  const imgID = trailerUrl.split("v=")[1].split("&")[0];
  const imgUrl = `https://img.youtube.com/vi/${imgID}/maxresdefault.jpg`;

  return (
    <div className="trailerbtn bg-gradient-to-t from-base-100 to-transparent inset-0">
      <div
        className="bgtrailer"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <button
        onClick={() => window.open(trailerUrl, "_blank")}
        className="btn btn-secondary rounded-custom w-[250px] h-[100px] text-2xl absolute text-primary"
      >
        Watch Trailer
      </button>
    </div>
  );
};

export default TrailerBtn;
