import React, { useEffect, useState } from "react";
import "./StarRating.css";

const AverageStarRating = () => {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  {
    /*  const openModal = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) modal?.showModal();
  };*/
  }

  const loadRatings = () => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings") || "{}");
    setRatings(savedRatings);
  };

  useEffect(() => {
    loadRatings();

    const interval = setInterval(() => {
      loadRatings();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const calcAverage = () => {
    const ratingValues = Object.values(ratings) as number[];
    const sum = ratingValues.reduce((sum, rating) => sum + rating, 0);
    const average = sum / ratingValues.length;
    return Math.round(average * 2) / 2;
  };

  const average = calcAverage();
  console.log(average);

  return (
    <fieldset className="rate averagedRatings">
      {[...Array(10)].map((_, index) => {
        const value = 10 - index;
        const title = value / 2;
        const isActive = average >= value;
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
