import "./css/LandingPage.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const LandingPage = () => {
    return (
        <>
            <Navbar/>
            <div className="flex  w-full h-screen">
                <div className={"landing-grid-container rounded-custom"}>
                    <div className={"explanationText p-3"}>
                        <h1 className={"text-accent2 font-bold text-3xl text-left"}>
                            Why to choose Settima?
                        </h1>
                        <p className={"text-primary font-bold text-xl text-left"}>
                            <ul className={"list-disc p-2"}>
                                <li className={"mb-2"}>Do specified reviews</li>
                                <li className={"mb-2"}>Discuss ideas and converse about your favourite films</li>
                                <li className={"mb-2"}>Save and share what you have watched</li>
                                <li className={"mb-2"}>Follow and learn from other people</li>
                                <li className={"mb-2"}>Modify your profile and show off your expertise</li>
                            </ul>
                        </p>
                    </div>
                    <div className={"startButton flex flex-col justify-end p-2"}>
                        <button className="w-full h-[60px] bg-accent2 rounded-custom text-primary font-bold text-2xl">
                            Start now
                        </button>

                    </div>

                    <div className={"backgroundLanding flex items-center justify-center"}>
                    </div>

                </div>
            </div>
            </>
            )
            }

            export default LandingPage;