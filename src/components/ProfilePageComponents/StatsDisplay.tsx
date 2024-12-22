const StatsDisplay = () => {
  return (
    <div className="stats-container grid grid-rows-auto w-full">
      <div className="row-start-1 w-full px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-base-100 border-x-[20px] border-accent2 rounded-t-custom mt-4"></div>
        <div className="relative grid grid-cols-3 w-full mx-auto text-center font-bold text-4xl py-2">
          <div>100</div>
          <div>85</div>
          <div>3.69</div>
        </div>
      </div>
      <div className="row-start-2 bg-accent2 rounded-b-custom w-full px-4 py-1 text-xs relative">
        <div className="grid grid-cols-3 mx-auto text-center font-semibold">
          <div>Total Movies</div>
          <div>Days Watched</div>
          <div>Mean Score</div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
