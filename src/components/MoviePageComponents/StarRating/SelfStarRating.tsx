import React, { useEffect, useState } from "react";
import "./StarRating.css";
import axios from "axios";

interface StarRatingProps {
  className?: string;
  category: string;
  movieId: string;
  resetStars: boolean;
  handleAverage: () => void;
  setResetStars: (value: boolean) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  className,
  category,
  movieId,
  resetStars,
  handleAverage,
  setResetStars,
}) => {
  const [rating, setRating] = useState(0);
  const [checked, setChecked] = useState(true);

  const backendCategory = category.toLowerCase().replace(/\s+/g, "_");

  useEffect(() => {
    const fetchRating = async () => {
      const authToken = localStorage.getItem("auth_token");
      if (!authToken) return;
      try {
        const response = await axios.get(
          `/api/movies/${movieId}/ratings/${backendCategory}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Include the Bearer token
            },
          }
        );
        if (response.data && response.data.rating !== undefined) {
          setRating(response.data.rating / 2 || 0);
          console.log(rating);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setRating(0);
      }
    };

    fetchRating();
  }, [category, movieId, resetStars]);

  const handleRatingChange = async (value: number) => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) return;
    try {
      const starValue = value;
      const payload = { [backendCategory]: starValue };
      console.log(payload);

      const response = await axios.post(
        `/api/movies/${movieId}/rate`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          withCredentials: true,
        }
      );
      setRating(starValue / 2);
      setChecked(false);
      setResetStars(false);
      console.log(`Rating for ${category} saved successfully:`, response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <fieldset className={`rate ${className}`}>
        {[...Array(10)].map((_, index) => {
          const value = 10 - index;
          const title = value / 2;
          const isHalf = index % 2 !== 0 ? "half" : "";

          const isActive = rating > 0 && rating * 2 <= value;
          const isChecked = rating !== 0 && isActive;

          return (
            <React.Fragment key={value}>
              <input
                type="radio"
                id={`${category}-rating${value}`}
                name={`${category}-rating`}
                value={value}
                checked={isChecked}
                onClick={() => {
                  handleRatingChange(value); //sends react error but this will not work with onChange!
                  setChecked(!checked);
                  handleAverage();
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
