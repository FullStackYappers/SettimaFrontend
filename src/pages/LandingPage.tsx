import "./css/LandingPage.css";
import Navbar from "../components/Navbar/Navbar";


const LandingPage = () => {
    return (
        <>
            <Navbar/>
            <div className="flex flex-col items-center max-h-screen w-full">
                <div
                    className="main-container relative flex justify-center w-90p bg-accent2 rounded-custom overflow-hidden">
                    <button type="button"
                            className="start-button btn bg-accent2 text-primary font-bold font-outfit">
                        Start Now!
                    </button>

                    <div
                        className="flex-1 bg-red-500 transition-all duration-500 hover:flex-[10] flex justify-center items-center group">
                        <h1 className="informative-text group-hover:opacity-100 opacity-45 transition-opacity duration-1000 text-primary font-bold font-outfit">"More
                            detailed ratings"</h1>
                    </div>

                    <div
                        className="flex-1 bg-green-500 transition-all duration-500 hover:flex-[10] flex justify-center items-center group">
                        <h1 className="informative-text group-hover:opacity-100 opacity-45 transition-opacity duration-1000 text-primary font-bold font-outfit">"Discuss
                            your ideas and find new theories"</h1>
                    </div>

                    <div
                        className="flex-1 bg-blue-500 transition-all duration-500 hover:flex-[10] flex justify-center items-center group">
                        <h1 className="informative-text group-hover:opacity-100 opacity-45 transition-opacity duration-1000 text-primary font-bold font-outfit">"Organize
                            all your viewed films"</h1>
                    </div>

                    <div
                        className="flex-1 bg-yellow-500 transition-all duration-500 hover:flex-[10] flex justify-center items-center group">
                        <h1 className="informative-text group-hover:opacity-100 opacity-45 transition-opacity duration-1000 text-primary font-bold font-outfit">"Follow
                            others and find what they are watching"</h1>
                    </div>

                    <div
                        className="flex-1 bg-purple-500 transition-all duration-500 hover:flex-[10] flex justify-center items-center group">
                        <h1 className="informative-text group-hover:opacity-100 opacity-45 transition-opacity duration-1000 text-primary font-bold font-outfit">"Customize
                            your profile and show off"</h1>
                    </div>
                </div>


            </div>
        </>
    )
}

export default LandingPage;