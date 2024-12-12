import "./css/LoginPage.css";
import nameWhite from "../assets/nameWhite.svg";


const LoginPage = () => {
    return (
        <div className="grid-container max-w-full max-h-full rounded-custom m-5 bg-accent">

            <div className="logo">
                <img src={nameWhite} alt="Settima Logo" className="w-40 h-auto"/>
            </div>

            <div className="usernameInput">
                <h1 className="m0 font-outfit text-primary font-medium">Username / Email</h1>
                <input type="text" className="w-75% bg-bgcolor rounded-custom" />
            </div>

            <div className="passwordInput">
                <h1 className="m0 font-outfit text-primary font-medium">Password</h1>
                <input type="text" className="w-75% bg-bgcolor rounded-custom"/>
                <h1 className="m0 font-outfit text-primary font-medium text-right">Forgot password?</h1>
            </div>

            <div className="login">
                <button className="bg-accent2 text-primary rounded-custom font-medium">
                    Login
                </button>
                <h1 className="m0 font-outfit text-accent2 font-medium">Not registered? Create an account</h1>
            </div>

            <div className="backgroundLogin opacity-100"></div>
        </div>
    )
}
export default LoginPage;