import "./RatingTable.css";
import StarRating from "../../StarRating/SelfStarRating";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import LoginModal from "../../../ForumPageComponents/LoginModal";

interface WatchedProps {
  watched: boolean;
  setWatched: () => void;
  movieId: string;
  handleAverage: () => void;
  review: string;
  setReview: (review: string) => void;
}

const RatingTable = ({
  watched,
  setWatched,
  movieId,
  handleAverage,
  review,
  setReview,
}: WatchedProps) => {
  const ratingCategories = [
    "Acting",
    "Plot",
    "Music",
    "Costume Design",
    "Cinematography",
    "Editing",
  ];

  const resetRatingsData = {
    acting: 0,
    plot: 0,
    music: 0,
    costume_design: 0,
    cinematography: 0,
    editing: 0,
  };
  const [resetStars, setResetStars] = useState(false);

  const resetRatings = async (movieId: string) => {
    try {
      const response = await axios.post(
        `/api/movies/${movieId}/rate`,
        resetRatingsData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      setResetStars(true);
      console.log("Ratings reset successfully:", response.data);
    } catch (error) {
      console.error("Error resetting ratings:", error);
    }
  };

  const handleRemoveFromList = async (movieId: string) => {
    try {
      const response = await axios.delete(`/api/movies/${movieId}/notwatched`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      console.log("Movie removed from watched list:", response.data);
    } catch (error) {
      console.error("Error removing movie from watched list:", error);
    }
  };

  const submitReview = async (movieId: string, review: string) => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      console.error("User not authenticated");
      return;
    }

    const payload = { review };

    try {
      const response = await axios.post(
        `/api/movies/${movieId}/rate`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Review submitted: ", response.data);
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  const handleReviewSubmission = () => {
    if (review.trim() || review === "") {
      submitReview(movieId, review.trim());
    }
  };

  //Modal stuff
  const { isLoggedIn } = useAuth();
  const [modalState, setModalState] = useState<"none" | "login" | "main">(
    "none"
  );
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleModal = () => {
    if (isLoggedIn) {
      setModalState("main");
    } else {
      setModalState("login");
    }
  };

  useEffect(() => {
    const loginModal = document.getElementById(
      "login_modal"
    ) as HTMLDialogElement;
    const mainModal = document.getElementById(
      "main_modal"
    ) as HTMLDialogElement;

    const handleClose = () => {
      setModalState("none");
    };

    if (loginModal) {
      if (modalState === "login") {
        loginModal.showModal();
      } else {
        loginModal.close();
      }
      loginModal.addEventListener("close", handleClose);
    }

    if (mainModal) {
      if (modalState === "main") {
        mainModal.showModal();
      } else {
        mainModal.close();
      }
      mainModal.addEventListener("close", handleClose);
    }

    return () => {
      if (loginModal) {
        loginModal.removeEventListener("close", handleClose);
      }
      if (mainModal) {
        mainModal.removeEventListener("close", handleClose);
      }
    };
  }, [modalState]);

  const handleConfirm = async () => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) return;
    try {
      await axios.post(
        `/api/movies/${movieId}/watched`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setWatched();
    } catch (error) {
      console.error("Error marking movie as watched:", error);
    }
  };

  return (
    <>
      <button
        className={`btn watchedbtn flex-grow max-w-[75%] rounded-custom text-xl ${
          watched
            ? "btn-primary text-secondary font-bold"
            : "btn-secondary text-primary"
        }`}
        onClick={() => {
          handleModal();
          setStep(1);
        }}
      >
        {watched ? "Watched" : "Watched?"}
      </button>

      <dialog id="main_modal" className="modal rounded-custom">
        <div className="modal-box w-[75vw] max-w-none h-[60vh] max-h-none bg-base-100 relative">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              onClick={() => {
                setStep(1);
                handleModal();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>

          {step === 1 && (
            <div className="flex flex-col h-full">
              <h2 className="text-4xl font-semibold font-outfit ml-4 mb-4">
                Rate & Review
              </h2>
              <div className="rating-container w-full p-4">
                {ratingCategories.map((category) => (
                  <div key={category} className="text-center">
                    <h2 className="star-headers">{category}</h2>
                    <StarRating
                      category={category}
                      movieId={movieId}
                      resetStars={resetStars}
                      setResetStars={setResetStars}
                      handleAverage={handleAverage}
                    />
                  </div>
                ))}
              </div>
              <div>
                <button
                  className="btn btn-ghost rounded-custom bottom-3 left-3 absolute"
                  onClick={() => {
                    if (resetStars) {
                      handleRemoveFromList(movieId);
                      window.location.reload();
                    } else if (watched) {
                      resetRatings(movieId);
                      handleAverage();
                    }
                  }}
                >
                  {resetStars ? "Remove from list" : "Reset ratings"}
                </button>
                <button
                  className="btn btn-ghost rounded-custom bottom-3 right-3 absolute"
                  onClick={nextStep}
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
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="review-container flex flex-col h-full">
              <h2 className="text-4xl font-semibold heading-font ml-4 mb-4">
                Rate & Review
              </h2>

              <div className="flex-grow mb-4 mx-4">
                <textarea
                  className="textarea placeholder-primary placeholder-opacity-50 bg-secondary w-full h-[90%] text-xl overflow-auto resize-none"
                  placeholder="Write review (Optional)"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  className="btn btn-ghost rounded-custom bottom-3 absolute"
                  onClick={prevStep}
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
                </button>
                <button
                  className="btn btn-ghost bottom-3 right-3 absolute rounded-custom"
                  onClick={() => {
                    handleConfirm();
                    handleReviewSubmission();
                    window.location.reload();
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>

      <LoginModal
        isOpen={modalState === "login"}
        onClose={() => setModalState("none")}
        context={"Rate"}
      />
    </>
  );
};

export default RatingTable;
