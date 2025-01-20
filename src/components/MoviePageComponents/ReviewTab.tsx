import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface Review {
  user_id: number;
  review: string;
}

const ReviewTab = () => {
  const { user } = useAuth();
  const { movieId } = useParams();
  const userId = user?.id;
  const [otherReviews, setOtherReviews] = useState<Review[]>([]);
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/api/user/ratings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        const ratings = response.data.data;

        const movieRatings = ratings.find(
          (rating: any) => rating.movie_id === Number(movieId)
        );

        if (movieRatings.review) {
          setReview(movieRatings.review);
        }
      } catch (error) {
        console.error("Error fetching user ratings:", error);
      }
    };

    const fetchOtherReviews = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}/reviews`);

        const filteredReviews = response.data.data.filter(
          (review: any) => review.user_id !== userId
        );

        console.log(filteredReviews);

        setOtherReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching user ratings:", error);
      }
    };

    fetchReview();
    fetchOtherReviews();
  }, [movieId, userId]);
  return (
    <div className="grid gap-4">
      {review && (
        <>
          <p className="text-2xl">Your Review</p>
          <div className="py-4 bg-base-100 mx-8 rounded-custom">
            <p className="py-4">
              {review.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </>
      )}
      <div className="grid gap-4">
        <Link to={`/movies/${movieId}/reviews`}>
          <p className="text-2xl hover:text-accent2">
            {userId ? "Other Reviews" : "Reviews"}
          </p>
        </Link>
        {otherReviews.slice(0, 2).map((otherReview, index) => (
          <div key={index} className="py-4 bg-base-100 mx-8 rounded-custom">
            <p className="py-4">
              {otherReview.review.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewTab;
