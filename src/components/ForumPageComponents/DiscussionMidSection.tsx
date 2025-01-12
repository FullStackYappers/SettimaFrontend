import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { loginUser } from "../../services/api/LoginApi.ts";
import { fetchUserData } from "../../services/api/UserApi.ts";
import { Link } from "react-router-dom";

const DiscussionMidSection = ({
  discussionDetails,
}: {
  discussionDetails: any;
}) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleModal = () => {
    if (isLoggedIn) {
      setIsCommentModalOpen(!isCommentModalOpen);
    } else {
      setIsLoginModalOpen(!isLoginModalOpen);
    }
  };

  useEffect(() => {
    const commentModal = document.getElementById(
      "comment_modal"
    ) as HTMLDialogElement;

    const loginModal = document.getElementById(
      "login_modal"
    ) as HTMLDialogElement;

    if (commentModal) {
      if (isCommentModalOpen) {
        commentModal.showModal();
      } else {
        commentModal.close();
      }
    }

    if (loginModal) {
      if (isLoginModalOpen) {
        loginModal.showModal();
      } else {
        loginModal.close();
      }
    }
  }, [isCommentModalOpen, isLoginModalOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginResponse = await loginUser({ email, password });
      if (loginResponse.token) {
        const userData = await fetchUserData(loginResponse.token);
        login(userData, loginResponse.token);
        setIsLoginModalOpen(false);
        setIsCommentModalOpen(true);
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials."
      );
    }
  };

  if (!discussionDetails || !discussionDetails.user) {
    return (
      <div id="preloader">
        <div className="image">
          <img src="/combWhite.svg" alt="preloader" />
        </div>
      </div>
    );
  }

  return (
    <div className="forum-container w-full flex justify-center">
      <div className="discussion-mid-section">
        <div className="add-comment-button">
          <button
            className="btn btn-ghost rounded-custom bottom-3 text-lg mb-4"
            onClick={handleModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Comment
          </button>
        </div>
      </div>

      <dialog id="comment_modal" className="modal rounded-custom">
        <div className="modal-box w-[75vw] max-w-none h-[60vh] max-h-none bg-base-100 relative">
          <form method="dialog">
            <div>
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
                onClick={handleModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary absolute search-close"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="flex flex-col h-full">
            <h2 className="text-4xl font-semibold font-outfit ml-4 mb-4">
              Add Comment
            </h2>

            <div className="flex-grow mb-4 mx-4">
              <textarea
                className="textarea placeholder-primary placeholder-opacity-50 bg-secondary w-full h-[90%] text-xl overflow-auto resize-none"
                placeholder="Write your comment here..."
              />
            </div>

            <div className="flex justify-end">
              <button
                className="btn btn-ghost bottom-3 right-3 absolute rounded-custom"
                onClick={handleModal}
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="login_modal" className="modal">
        <div className="modal-box w-[30vw] max-w-none h-[60vh] max-h-none bg-base-100 relative rounded-custom">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              onClick={handleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary absolute search-close"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>

          <div className="flex flex-col h-full justify-center items-center">
            <h2 className="text-2xl font-semibold font-outfit mb-4">
              Login to Comment
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
            {error && (
              <p className="text-red-500 text-center mt-4"> {error} </p>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DiscussionMidSection;
