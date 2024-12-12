import "./css/LoginPage.css";
import nameWhite from "../assets/nameWhite.svg";


const LoginPage = () => {
    return (
        <div className="grid-container max-w-full max-h-full rounded-custom bg-accent">

            <div className="logo">
                <img src={nameWhite} alt="Settima Logo" className="w-40 h-auto"/>
            </div>

            <div className="usernameInput m-7">
                <h1 className="m0 font-outfit text-primary font-medium">Username / Email</h1>
                <input type="text" className="w-full h-[60px] bg-bgcolor rounded-custom" />
            </div>

            <div className="passwordInput m-7">
                <h1 className="m0 font-outfit text-primary font-medium">Password</h1>
                <input type="text" className="w-full h-[60px] bg-bgcolor rounded-custom"/>
                <h1 className="m0 font-outfit text-primary font-medium text-right">Forgot password?</h1>
            </div>

            <div className="login m-7 flex flex-col items-center">
                <button className="w-full h-[60px] bg-accent2 rounded-custom font-bold text-2xl">
                    Login
                </button>
                <h1 className="m0 font-outfit text-accent2 font-medium">Not registered? Create an account</h1>
            </div>

            <div className="backgroundLogin opacity-100 "></div>
        </div>
    )
}
export default LoginPage;