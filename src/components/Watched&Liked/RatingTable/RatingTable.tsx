import "./RatingTable.css";
import StarRating from "../../StarRating/StarRating";
import { useEffect, useState } from "react";

const RatingTable = () => {
  const ratingCategories = [
    "Acting",
    "Plot",
    "Music",
    "Costume Design",
    "Cinematography",
    "Editing",
  ];

  const [ratings, setRatings] = useState<Record<string, number>>({
    Acting: 0,
    Plot: 0,
    Music: 0,
    "Costume Design": 0,
    Cinematography: 0,
    Editing: 0,
  });

  const handleRating = (category: string, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: value,
    }));
  };

  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const [watched, setWatched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      if (isOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isOpen]);

  const handleConfirm = () => {
    setWatched(true);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`btn flex-grow max-w-[75%] rounded-custom text-xl ${
          watched
            ? "btn-primary text-secondary font-bold"
            : "btn-secondary text-primary"
        }`}
        onClick={handleModal}
      >
        {watched ? "Watched" : "Watched?"}
      </button>

      <dialog id="my_modal_3" className="modal rounded-custom">
        <div className="modal-box w-[75vw] max-w-none h-[50vh] max-h-none bg-base-100 relative">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setStep(1);
                handleModal();
              }}
            >
              ✕
            </button>
          </form>

          {step === 1 && (
            <>
              <div className="rating-container w-full p-4">
                {ratingCategories.map((category) => (
                  <div key={category} className="text-center">
                    <h2 className="text-2xl font-semibold">{category}</h2>
                    <StarRating
                      category={category}
                      handleRating={handleRating}
                      ratings={ratings}
                    />
                  </div>
                ))}
              </div>
              {watched === true && (
                <button
                  className="btn btn-ghost rounded-custom left-2 bottom-3 absolute"
                  onClick={() => setWatched(false)}
                >
                  Remove from list
                </button>
              )}
              <button
                className="btn btn-ghost rounded-custom right-2 bottom-3 absolute"
                onClick={nextStep}
              >
                Next
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
            </>
          )}

          {step === 2 && (
            <div className="review-container">
              <h2 className="text-2xl font-bold text-center mb-4">
                Write Your Review
              </h2>
              <textarea
                className="textarea textarea-bordered w-full h-40"
                placeholder="Enter your review here..."
              />
              <div className="flex justify-between mt-4">
                <button
                  className="btn btn-ghost rounded-custom left-2 bottom-3 absolute"
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
                  Back
                </button>
                <button
                  className="btn btn-ghost rounded-custom right-2 bottom-3 absolute"
                  onClick={() => {
                    handleConfirm();
                    setStep(1);
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};

export default RatingTable;
