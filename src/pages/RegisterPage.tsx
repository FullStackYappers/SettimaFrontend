import "./css/RegisterPage.css";
import nameWhite from "../assets/nameWhite.svg";

const RegisterPage = () => {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="register-grid-container rounded-custom bg-accent">
                <div className="logo">
                    <img
                        src={nameWhite}
                        alt="Settima Logo"
                        className="w-40 h-auto ml-4 "
                    />
                </div>

                <div className="usernameInput m-4">
                    <h1 className="m0 font-outfit text-primary font-medium p-2">
                        Username
                    </h1>
                    <input
                        type="text"
                        className="w-full h-[60px] bg-bgcolor rounded-custom p-4"
                    />
                </div>

                <div className="emailInput m-4">
                    <h1 className="m0 font-outfit text-primary font-medium p-2">
                        Email
                    </h1>
                    <input
                        type="email"
                        className="w-full h-[60px] bg-bgcolor rounded-custom p-4"
                    />
                </div>

                <div className="passwordInput m-4">
                    <h1 className="m0 font-outfit text-primary font-medium p-2">
                        Password
                    </h1>
                    <input
                        type="password"
                        className="w-full h-[60px] bg-bgcolor rounded-custom p-4"
                    />
                </div>

                <div className="passwordConfirmInput m-4">
                    <h1 className="m0 font-outfit text-primary font-medium p-2">
                        Confirm Password
                    </h1>
                    <input
                        type="password"
                        className="w-full h-[60px] bg-bgcolor rounded-custom p-4"
                    />
                </div>

                <div className="register m-4 flex flex-col items-center">
                    <button className="w-full h-[60px] bg-accent2 rounded-custom text-primary font-bold text-2xl">
                        Register
                    </button>
                </div>

                <div className="backgroundLogin flex items-center justify-center">
                    <h1 className="text-primary font-bold text-3xl text-center">
                        Start to share your favourite moments <br/>
                        <u> one scene at a time.</u>
                    </h1>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;