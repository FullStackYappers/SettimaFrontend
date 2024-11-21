import Navbar from "../components/Navbar";
import movieImg from "../assets/movieImg.jpg";
import "./css/MoviePage.css";

const MoviePage = () => {
  return (
    <>
      <Navbar />
      <div className="grid-container mx-4 mt-4">
        <div className="trailerbtn btn btn-ghost">
          <button>Watch Trailer</button>
        </div>
        <div className="movieImg">
          <img src={movieImg} alt="movieImg" />
        </div>
        <div className="title">
          <h1 className="m0">Movie Title</h1>
        </div>
        <div className="genres">
          <p>Genre 1</p>
          <p>Genre 2</p>
        </div>
        <div className="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="boxes">
          <div className="rating">Your Rating</div>
          <div className="where">Where to Watch?</div>
        </div>
        <div className="watched flex justify-evenly">
          <div className="btn btn-ghost">
            <button>Watched?</button>
          </div>
          <div className="btn btn-ghost">
            <button>Heart?</button>
          </div>
        </div>
        <div className="specificCast">
          <p>Directed by: Director</p>
          <p>Cinematography by: Cinematographer</p>
          <p>Music by: Composer</p>
          <p>Costumes designed by: Designer 1 Designer 2</p>
        </div>
        <div className="multipleDisplay1">
          <div className="cast">
            <h2>Cast</h2>
            <p>Actor 1</p>
            <p>Actor 2</p>
            <p>Actor 3</p>
          </div>
          <div className="crew">
            <h2>Crew</h2>
            <p>Crew Member 1</p>
            <p>Crew Member 2</p>
            <p>Crew Member 3</p>
          </div>
          <div className="details">
            <h2>Details</h2>
            <p>Location</p>
            <p>Release Date</p>
          </div>
        </div>
        <div className="multipleDisplay2">
          <div className="avgRating">
            <h2>Average Ratings</h2>
          </div>
          <div className="followingRating">
            <h2>Following</h2>
          </div>
          <div className="forum">
            <h2>Discussion</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;
