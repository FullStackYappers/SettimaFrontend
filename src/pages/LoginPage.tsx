import React, { useState } from "react";
import "./css/LoginPage.css";
import nameWhite from "../assets/nameWhite.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api/LoginApi";
import { fetchUserData } from "../services/api/UserApi";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginResponse = await loginUser({ email, password });
      if (loginResponse.token) {
        const userData = await fetchUserData(loginResponse.token);
        login(userData, loginResponse.token);
        navigate("/"); // Redirection to Home Page after successful login
      } else {
        console.error("Invalid login response:", loginResponse);
        throw new Error("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="login-grid-container rounded-custom bg-accent">
        <div className="logo">
          <Link to={"/landing"}>
            {" "}
            {
              //this is just here to see the landing page in process
            }
            <img
              src={nameWhite}
              alt="Settima Logo"
              className="w-40 h-auto ml-4 "
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="usernameInput m-7">
            <h1 className="m0 font-outfit text-primary font-medium p-2">
              Username / Email
            </h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[60px] bg-bgcolor rounded-custom p-2"
            />
          </div>

          <div className="passwordInput m-7">
            <h1 className="m0 font-outfit text-primary font-medium p-2">
              Password
            </h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[60px] bg-bgcolor rounded-custom p-2"
            />
            <h1 className="m0 font-outfit text-primary font-medium text-right p-2">
              Forgot password?
            </h1>
          </div>

          <div className="login mx-7 flex flex-col items-center">
            <button
              type="submit"
              className="w-full h-[60px] btn btn-accent rounded-custom text-primary font-outfit font-bold text-2xl"
            >
              Login
            </button>
            <Link to={"/register"}>
              <h1 className="m0 font-outfit text-accent2 font-medium p-2">
                Not registered? Create an account
              </h1>
            </Link>
          </div>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

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
