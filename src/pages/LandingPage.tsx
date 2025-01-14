import "./css/LandingPage.css";
import Navbar from "../components/Navbar/Navbar";

import LatestMovieCarousel from "../components/HomePageComponents/LatestMovieCarousel.tsx";
import nameWhite from "../assets/nameWhite.svg";


const LandingPage = () => {
    return (
        <>
            <Navbar/>
            <div className="flex flex-col items-center h-full w-full">
                <div
                    className="main-container relative flex justify-center w-90p bg-accent2 rounded-custom overflow-hidden group">

                    <img src={nameWhite} alt="Settima Logo" className="logo transition-opacity duration-1000 opacity-100 group-hover:opacity-0 group-hover:invisible"/>


                    <button type="button"
                            className="start-button btn bg-accent2 text-primary font-bold font-outfit">
                        Start Now!
                    </button>


                    <div
                        className="first-slide flex-1 bg-accent2 transition-all duration-1000 hover:flex-[10] flex justify-center items-center group/slide">
                        <h1 className="informative-text group-hover/slide:opacity-100 opacity-0 transition-opacity duration-1000 text-primary font-bold font-outfit">"More
                            detailed ratings"</h1>
                    </div>

                    <div
                        className="second-slide flex-1 bg-bgcolor transition-all duration-1000 hover:flex-[10] flex justify-center items-center group/slide">
                        <h1 className="informative-text group-hover/slide:opacity-100 opacity-0 transition-opacity duration-1000 text-primary font-bold font-outfit">"Discuss
                            your ideas and find new theories"</h1>
                    </div>

                    <div
                        className="third-slide flex-1 bg-accent2 transition-all duration-1000 hover:flex-[10] flex justify-center items-center group/slide">
                        <h1 className="informative-text group-hover/slide:opacity-100 opacity-0 transition-opacity duration-1000 text-primary font-bold font-outfit">"Organize
                            all your viewed films"</h1>
                    </div>

                    <div
                        className="fourth-slide flex-1 bg-black transition-all duration-1000 hover:flex-[10] flex justify-center items-center group/slide">
                        <h1 className="informative-text group-hover/slide:opacity-100 opacity-0 transition-opacity duration-1000 text-primary font-bold font-outfit">"Follow
                            others and find what they are watching"</h1>
                    </div>

                    <div
                        className="fifth-slide flex-1 bg-accent2 transition-all duration-1000 hover:flex-[10] flex justify-center items-center group/slide">
                        <h1 className="informative-text group-hover/slide:opacity-100 opacity-0 transition-opacity duration-1000 text-primary font-bold font-outfit">"Customize
                            your profile and show off"</h1>
                    </div>

                </div>

                <div className="whats-new p-6">
                    <h2 className="font-outfit text-3xl m-0 p-0">What's New</h2>
                    <LatestMovieCarousel/>
                </div>

            </div>
        </>
    )
}

export default LandingPage;