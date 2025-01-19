// LoginModal.tsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { loginUser } from "../../services/api/LoginApi.ts";
import { fetchUserData } from "../../services/api/UserApi.ts";
import { Link } from "react-router-dom";
import logoName from "../../assets/nameLogo.png";
import logoWhite from "../../../public/logoWhite.svg";

const LoginModal = ({
  isOpen,
  onClose,
  context,
}: {
  isOpen: boolean;
  onClose: () => void;
  context: string;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginResponse = await loginUser({ email, password });
      if (loginResponse.token) {
        const userData = await fetchUserData(loginResponse.token);
        login(userData, loginResponse.token);
        onClose();
        window.location.reload();
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    }
  };

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box w-[30vw] max-w-none h-[60vh] max-h-none bg-base-100 relative rounded-custom">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary absolute search-close"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col h-full justify-center items-center">
          <div>
            <img className="mb-8" src={logoName} width={150} alt="Settima" />
          </div>
          <h2 className="text-2xl font-semibold font-outfit mb-4">
            Login to {context}
          </h2>
          <form className="w-full px-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="input w-full my-4 bg-accent rounded-custom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input w-full my-4 bg-accent rounded-custom"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-accent rounded-custom text-primary font-bold text-2xl w-full mt-4"
            >
              Login
            </button>
            <Link to={"/register"}>
              <h1 className="m0 font-outfit text-accent2 font-medium p-2 flex items-center justify-center">
                Not registered? Create an account
              </h1>
            </Link>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </dialog>
  );
};

export default LoginModal;
