import React, { useEffect, useState } from "react";
import "./StarRating.css";
import axios from "axios";

interface StarRatingProps {
  className?: string;
  category: string;
  handleRating?: (category: string, value: number) => void;
  movieId: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  className,
  category,
  handleRating,
  movieId,
}) => {
  const [rating, setRating] = useState<number | null>(null);

  const backendCategory = category.toLowerCase().replace(/\s+/g, "_");

  useEffect(() => {
    const fetchRating = async () => {
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
          setRating(response.data.rating || 0);
          console.log(backendCategory, "", rating);
        } else {
          setRating(0);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setRating(0);
      }
    };

    fetchRating();
  }, [category, movieId]);

  const handleRatingChange = async (value: number) => {
    try {
      const starValue = value / 2;
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

      console.log(`Rating for ${category} saved successfully:`, response.data);

      handleRating?.(category, value);
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
          const isChecked = rating !== null && value >= Math.floor(rating * 2);
          return (
            <React.Fragment key={value}>
              <input
                type="radio"
                id={`${category}-rating${value}`}
                name={`${category}-rating`}
                value={value}
                checked={isChecked}
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
