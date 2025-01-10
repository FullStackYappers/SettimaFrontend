import React, { useEffect, useState } from "react";
import "./StarRating.css";

interface AverageRatingProps {
  average: number;
}

const AverageStarRating: React.FC<AverageRatingProps> = ({ average }) => {
  const [avg, setAvg] = useState(average);

  useEffect(() => {
    setAvg(average);
  }, [average]);

  return (
    <fieldset className="rate averagedRatings">
      {[...Array(10)].map((_, index) => {
        const value = 10 - index;
        const title = value / 2;
        const isActive = avg !== 0 && avg * 2 >= value;
        const isHalf = index % 2 !== 0 ? "half" : "";

        return (
          <React.Fragment key={value}>
            <input
              type="radio"
              id={`rating${value}`}
              disabled
              checked={isActive}
            />
            <label
              htmlFor={`rating${value}`}
              className={`${isHalf} ${isActive ? "active" : ""}`}
              title={title.toString()}
            />
          </React.Fragment>
        );
      })}
    </fieldset>
  );
};

export default AverageStarRating;
