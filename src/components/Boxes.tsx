import StarRating from "./StarRating/StarRating";

const Boxes = () => {
  return (
    <div className="boxes">
      <div className="rounded-custom bg-secondary w-full h-full flex flex-col justify-center items-center mx-2">
        <h2 className="font-semibold text-2xl">Your Rating</h2>
        <StarRating className="averagedRatings" />
      </div>
      <div className="rounded-custom bg-secondary w-full h-full flex justify-center items-center mx-2">
        <h2 className="m-0 font-semibold text-2xl">Where to Watch?</h2>
      </div>
    </div>
  );
};

export default Boxes;
