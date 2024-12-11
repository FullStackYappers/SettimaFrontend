//Test image
import movieImg from "../assets/movieImg.jpg";
//Styles
import "./css/MoviePage.css";

//Components
import Navbar from "../components/Navbar/Navbar";
import TabLeft from "../components/MoviePageComponents/TabLeft";
import TabRight from "../components/MoviePageComponents/TabRight";
import WatchedLikedContainer from "../components/MoviePageComponents/Watched&Liked/WatchLikedContainer";
import Boxes from "../components/MoviePageComponents/Boxes";
import KeyStaff from "../components/MoviePageComponents/KeyStaff";
import Genres from "../components/MoviePageComponents/Genres";

const MoviePage = () => {
  return (
    <>
      <Navbar />
      <div className="grid-container mx-4 mt-4 text-primary">
        <div className="trailerbtn flex justify-center">
          <button className="btn btn-secondary rounded-custom w-[250px] h-[100px] text-2xl">
            Watch Trailer
          </button>
        </div>
        <div className="movieImg">
          <img src={movieImg} alt="movieImg" />
        </div>
        <div className="title heading-font">
          <h1 className="m0 font-outfit text-7xl font-semibold">Movie Title</h1>
        </div>
        <Genres />
        <div className="description m0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <Boxes />
        <WatchedLikedContainer />
        <TabLeft />
        <TabRight />
        <KeyStaff />
      </div>
    </>
  );
};

export default MoviePage;
