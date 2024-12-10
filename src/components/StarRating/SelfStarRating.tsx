import React from "react";
import "./StarRating.css";

interface StarRatingProps {
  className?: string;
  category: string;
  handleRating?: (category: string, value: number) => void;
  ratings?: Record<string, number>;
}

const StarRating: React.FC<StarRatingProps> = ({
  className,
  category,
  handleRating,
  ratings,
}) => {
  const savedRatings = JSON.parse(localStorage.getItem("ratings") || "{}");

  const handleRatingChange = (value: number) => {
    handleRating?.(category, value);
    savedRatings[category] = value;
    localStorage.setItem("ratings", JSON.stringify(savedRatings));
  };

  console.log("Loaded saved ratings:", localStorage.getItem("ratings"));

  const calcAverage = () => {
    const ratingValues = Object.values(savedRatings) as number[];

    //need to log stuff to check how it's working
    console.log("ALL SAVED RATINGS:", savedRatings);
    console.log("Ratings for this category:", savedRatings[category]);
    console.log("Rating values: ", ratingValues);

    const average =
      ratingValues.reduce((sum, rating) => sum + rating, 0) /
      ratingValues.length;
    return Math.round(average * 2) / 2;
  };

  console.log(calcAverage());

  return (
    <>
      <fieldset className={`rate ${className}`}>
        {[...Array(10)].map((_, index) => {
          const value = 10 - index;
          const title = value / 2;
          const isHalf = index % 2 !== 0 ? "half" : "";
          return (
            <React.Fragment key={value}>
              <input
                type="radio"
                id={`${category}-rating${value}`}
                name={`${category}-rating`}
                value={value}
                checked={ratings && ratings[category] === value}
                onChange={() => {
                  handleRatingChange(value);
                }}
              />
              <label
                htmlFor={`${category}-rating${value}`}
                title={title.toString()}
                className={isHalf}
              ></label>
            </React.Fragment>
          );
        })}
      </fieldset>
    </>
  );
};

export default StarRating;
