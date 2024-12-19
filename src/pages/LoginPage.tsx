import "./css/LoginPage.css";
import nameWhite from "../assets/nameWhite.svg";
import { Link } from "react-router-dom";


const LoginPage = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="login-grid-container rounded-custom bg-accent">
        <div className="logo">
          <img
            src={nameWhite}
            alt="Settima Logo"
            className="w-40 h-auto ml-4 "
          />
        </div>

        <div className="usernameInput m-7">
          <h1 className="m0 font-outfit text-primary font-medium p-2">
            Username / Email
          </h1>
          <input
            type="email"
            className="w-full h-[60px] bg-bgcolor rounded-custom p-2"
          />
        </div>

        <div className="passwordInput m-7">
          <h1 className="m0 font-outfit text-primary font-medium p-2">
            Password
          </h1>
          <input
            type="password"
            className="w-full h-[60px] bg-bgcolor rounded-custom p-2"
          />
          <h1 className="m0 font-outfit text-primary font-medium text-right p-2">
            Forgot password?
          </h1>
        </div>

        <div className="login m-7 flex flex-col items-center">
          <button className="w-full h-[60px] bg-accent2 rounded-custom text-primary font-bold text-2xl">
            Login
          </button>
          <Link to={"/register"}>
          <h1 className="m0 font-outfit text-accent2 font-medium p-2">
            Not registered? Create an account
          </h1>
          </Link>
        </div>

        <div className="backgroundLogin flex items-center justify-center">
          <h1 className="text-primary font-bold text-3xl text-center">
            Rate, review and showcase your movie journey <br />{" "}
            <u> one scene at a time.</u>
          </h1>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
