import AverageStarRating from "./StarRating/AverageStarRating";
import WhereToWatch from "./WhereToWatch";

interface BoxesProps {
  average: number;
  movieId: string;
}

const Boxes: React.FC<BoxesProps> = ({ average, movieId }) => {
  return (
    <div className="boxes">
      <div className="rounded-custom bg-secondary w-full h-full flex flex-col justify-center items-center mx-2">
        <h2 className="font-semibold text-2xl">Your Rating</h2>
        <AverageStarRating average={average} />
      </div>
      <div className="rounded-custom bg-secondary w-full h-full flex flex-col justify-center items-center mx-2 gap-2">
        <h2 className="m-0 font-semibold text-2xl">Where to Watch?</h2>
        <WhereToWatch movieId={movieId} />
      </div>
    </div>
  );
};

export default Boxes;
