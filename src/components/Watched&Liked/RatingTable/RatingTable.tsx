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
        onClick={() => {
          handleModal();
          setStep(1);
        }}
      >
        {watched ? "Watched" : "Watched?"}
      </button>

      <dialog id="my_modal_3" className="modal rounded-custom">
        <div className="modal-box w-[75vw] max-w-none h-[60vh] max-h-none bg-base-100 relative">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              onClick={() => {
                setStep(1);
                handleModal();
              }}
            >
              ✕
            </button>
          </form>

          {step === 1 && (
            <div className="flex flex-col h-full">
              <h2 className="text-4xl font-semibold heading-font ml-4 mb-4">
                Rate & Review
              </h2>
              <div className="rating-container flex-grow w-full p-4">
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
              <div className="flex justify-between">
                {watched === true && (
                  <button
                    className="btn btn-ghost rounded-custom bottom-3 absolute"
                    onClick={() => {
                      setWatched(false);
                      setRatings({
                        Acting: 0,
                        Plot: 0,
                        Music: 0,
                        "Costume Design": 0,
                        Cinematography: 0,
                        Editing: 0,
                      });
                    }}
                  >
                    Remove from list
                  </button>
                )}
                <button
                  className="btn btn-ghost rounded-custom bottom-3 absolute right-3"
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
                  className="textarea textarea-bordered w-full h-[90%] overflow-auto resize-none"
                  placeholder="Enter your review here..."
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
                    setStep(1);
                    handleConfirm();
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
