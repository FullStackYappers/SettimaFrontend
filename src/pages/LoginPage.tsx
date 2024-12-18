import "./css/LoginPage.css";
import nameWhite from "../assets/nameWhite.svg";

const LoginPage = () => {
    return (
        <div className="login-grid-container max-w-full max-h-full rounded-custom bg-accent">
            <div className="logo">
                <img src={nameWhite} alt="Settima Logo" className="w-40 h-auto"/>
            </div>

            <div className="usernameInput m-7">
                <h1 className="m0 font-outfit text-primary font-medium">
                    Username / Email
                </h1>
                <input
                    type="email"
                    className="w-full h-[60px] bg-bgcolor rounded-custom p-3"
                />
            </div>

            <div className="passwordInput m-7">
                <h1 className="m0 font-outfit text-primary font-medium">Password</h1>
                <input
                    type="password"
                    className="w-full h-[60px] bg-bgcolor rounded-custom p-3"
                />
                <h1 className="m0 font-outfit text-primary font-medium text-right">
                    Forgot password?
                </h1>
            </div>

            <div className="login m-7 flex flex-col items-center">
                <button className="w-full h-[60px] bg-accent2 rounded-custom text-primary font-bold text-2xl">
                    Login
                </button>
                <h1 className="m0 font-outfit text-accent2 font-medium">
                    Not registered? Create an account
                </h1>
            </div>

            <div className="backgroundLogin flex items-center justify-center">
                <h1 className="text-primary font-bold text-3xl text-center">
                    Rate, review and showcase your movie journey <br/> <u> one scene at a time.</u>
                </h1>
            </div>
        </div>
    );
};
export default LoginPage;
