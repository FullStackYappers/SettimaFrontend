import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";

interface Review {
  user_id: number;
  review: string;
}

const ReviewPage = () => {
  const { user } = useAuth();
  const { movieId } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | undefined>(undefined);
  const [movieTitle, setMovieTitle] = useState("");
  const userId = user?.id;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    const fetchMovieTitle = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}`);
        setMovieTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching movie title:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}/reviews`);

        console.log(response.data.data);

        const filteredReviews = response.data.data.filter(
          (review: any) => review.user_id !== userId
        );

        const userReview = response.data.data.find(
          (review: any) => review.user_id === userId
        );

        setUserReview(userReview);
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching user ratings:", error);
      }
    };

    fetchMovieTitle();
    fetchReviews();
  }, [movieId]);

  return (
    <>
      <Navbar />
      <div className="back-button ml-8 text-primary">
        <button
          className="btn btn-ghost rounded-custom bottom-3 text-lg mb-4"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="inline-block h-6 w-6 stroke-current text-primary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back to Movie
        </button>
      </div>
      <div className="grid gap-4 text-primary">
        {userId && (
          <>
            <p className="text-2xl font-semibold">
              Your Review of{" "}
              <Link to={`/movie/${movieId}`}>
                <span className="hover:text-accent2">{movieTitle}</span>
              </Link>
            </p>
            <div className="py-4 bg-secondary mx-8 rounded-custom">
              <p className="py-4">
                {userReview?.review.split("\n").map((line, index) => (
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
          <p className="text-2xl font-semibold">
            {userId ? (
              <>
                Other Reviews of{" "}
                <Link to={`/movie/${movieId}`}>
                  <span className="hover:text-accent2">{movieTitle}</span>
                </Link>
              </>
            ) : (
              <>
                Reviews of{" "}
                <Link to={`/movie/${movieId}`}>
                  <span className="hover:text-accent2">{movieTitle}</span>
                </Link>
              </>
            )}
          </p>
          {reviews.map((otherReview) => (
            <div className="py-4 bg-secondary mx-8 rounded-custom">
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
    </>
  );
};

export default ReviewPage;
