interface AverageRatingsProps {
  average: number;
  movieAverage: number;
}

const AverageRatings: React.FC<AverageRatingsProps> = ({
  average,
  movieAverage,
}) => {
  const authToken = localStorage.getItem("auth_token");

  console.log(movieAverage);
  const ratings = [
    { label: "Average Rating", value: movieAverage, color: "#992434" },
    ...(authToken
      ? [{ label: "Your Rating", value: average, color: "#E7E7CF" }]
      : []),
  ];

  return (
    <div className="grid gap-4 p-4 mx-8">
      {ratings.map((rating) => (
        <div
          key={rating.label}
          className="grid grid-cols-[150px_1fr_auto] items-center gap-2"
        >
          <span className="text-base">{rating.label}</span>
          <div className="h-8 rounded-full relative">
            <div
              className="h-8 rounded-full absolute top-0 left-0"
              style={{
                width: `${rating.value * 20}%`,
                backgroundColor: rating.color,
              }}
            />
          </div>
          <span className="text-sm">{rating.value}</span>
        </div>
      ))}
    </div>
  );
};

export default AverageRatings;
