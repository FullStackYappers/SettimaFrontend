import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface AverageRatingsProps {
  average: number;
}

const AverageRatings: React.FC<AverageRatingsProps> = ({ average }) => {
  const { movieId } = useParams();
  const authToken = localStorage.getItem("auth_token");
  const [movieAverage, setMovieAverage] = useState(0);

  useEffect(() => {
    const fetchAverageRatings = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}/ratings`);
        const ratings = response.data.data;

        const categories = [
          "acting",
          "plot",
          "music",
          "costume_design",
          "cinematography",
          "editing",
        ];

        const averages = ratings.map((movieRatings) => {
          const total = categories.reduce(
            (sum, category) => sum + Number(movieRatings[category] / 2 || 0),
            0
          );
          return total / 6;
        });

        console.log(averages);

        const mean = Number(
          (
            averages.reduce((sum: number, avg: number) => sum + avg, 0) /
            averages.length
          ).toFixed(2)
        );

        setMovieAverage(mean);
      } catch (error) {
        console.error("Error fetching watched status:", error);
      }
    };

    fetchAverageRatings();
  });

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
