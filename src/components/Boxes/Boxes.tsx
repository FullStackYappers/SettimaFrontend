import "./Boxes.css";

const Boxes = () => {
  return (
    <div className="boxes">
      <div className="rounded-custom bg-secondary w-full h-full flex flex-col justify-center items-center mx-2">
        <h2 className="font-semibold text-2xl">Your Rating</h2>
        <fieldset className="rate">
          <input type="radio" id="rating10" name="rating" value="10" />
          <label htmlFor="rating10" title="5"></label>
          <input type="radio" id="rating9" name="rating" value="9" />
          <label className="half" htmlFor="rating9" title="4.5"></label>
          <input type="radio" id="rating8" name="rating" value="8" />
          <label htmlFor="rating8" title="4"></label>
          <input type="radio" id="rating7" name="rating" value="7" />
          <label className="half" htmlFor="rating7" title="3.5"></label>
          <input type="radio" id="rating6" name="rating" value="6" />
          <label htmlFor="rating6" title="3"></label>
          <input type="radio" id="rating5" name="rating" value="5" />
          <label className="half" htmlFor="rating5" title="2.5"></label>
          <input type="radio" id="rating4" name="rating" value="4" />
          <label htmlFor="rating4" title="2"></label>
          <input type="radio" id="rating3" name="rating" value="3" />
          <label className="half" htmlFor="rating3" title="1.5"></label>
          <input type="radio" id="rating2" name="rating" value="2" />
          <label htmlFor="rating2" title="1"></label>
          <input type="radio" id="rating1" name="rating" value="1" />
          <label className="half" htmlFor="rating1" title=".5"></label>
        </fieldset>
      </div>
      <div className="rounded-custom bg-secondary w-full h-full flex justify-center items-center mx-2">
        <h2 className="m-0 font-semibold text-2xl">Where to Watch?</h2>
      </div>
    </div>
  );
};

export default Boxes;
