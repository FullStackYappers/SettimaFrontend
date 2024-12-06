import "./RatingTable.css";

const RatingTable = () => {
  return (
    <>
      <button
        className="btn flex-grow max-w-[75%] rounded-custom text-xl btn-secondary text-primary"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        Watched?
      </button>
      <dialog id="my_modal_3" className="modal rounded-custom">
        <div className="modal-box w-[90%] max-w-none h-[90%] max-h-none bg-secondary">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="rating-container w-full h-full p-4">
            <div className="acting text-2xl font-semibold">Acting</div>
            <div className="plot text-2xl font-semibold">Plot</div>
            <div className="music text-2xl font-semibold">Music</div>
            <div className="costume text-2xl font-semibold">Costume</div>
            <div className="cinematography text-2xl font-semibold">
              Cinematography
            </div>
            <div className="editing text-2xl font-semibold">Editing</div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RatingTable;
