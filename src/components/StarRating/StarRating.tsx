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
  const openModal = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) modal?.showModal();
  };

  const handleRatingChange = (value: number) => {
    handleRating?.(category, value);
    const savedRatings = JSON.parse(localStorage.getItem("rating") || "{}");
    savedRatings[category] = value;
    localStorage.setItem("ratings", JSON.stringify(savedRatings));
  };

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
                  openModal();
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
