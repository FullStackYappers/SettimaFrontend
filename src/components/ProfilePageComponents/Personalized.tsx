import FavDisplay from "./FavDisplay";
import StatsDisplay from "./StatsDisplay";

const Personalized = () => {
  return (
    <div className="personal-container flex items-center justify-between gap-20">
      <div className="w-1/2 flex-grow">
        <StatsDisplay />
      </div>
      <div className="w-1/2 flex-grow">
        <FavDisplay />
      </div>
    </div>
  );
};

export default Personalized;
