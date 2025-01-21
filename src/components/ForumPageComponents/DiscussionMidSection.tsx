import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import LoginModal from "./LoginModal.tsx";
import axios from "axios";

const DiscussionMidSection = ({
  discussionDetails,
}: {
  discussionDetails: any;
}) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const username = user?.username;
  const [comment, setComment] = useState("");

  const handleModal = () => {
    if (isLoggedIn) {
      setIsCommentModalOpen(!isCommentModalOpen);
    } else {
      setIsLoginModalOpen(!isLoginModalOpen);
    }
  };

  const addComment = async (content: string) => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      console.error("User not authenticated");
      return;
    }

    const payload = { content };

    try {
      const response = await axios.post(
        `/api/discussions/${discussionDetails.id}/comments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Comment Added: ", response.data);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleCommentSubmission = () => {
    if (comment.trim() || comment === "") {
      addComment(comment.trim());
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
    <div className="forum-mid-container w-full flex px-8">
      {/* forum-mid-container w-full flex justify-left px-8 */}
      <div className="discussion-mid-section w-full">
        {/*discussion-mid-section w-[90%]*/}
        <div className="add-comment-button flex justify-center">
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
              Add Comment as {username}
            </h2>

            <div className="flex-grow mb-4 mx-4">
              <textarea
                className="textarea placeholder-primary placeholder-opacity-50 bg-secondary w-full h-[90%] text-xl overflow-auto resize-none"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="btn btn-ghost bottom-3 right-3 absolute rounded-custom text-xl"
                onClick={() => {
                  handleCommentSubmission();
                  window.location.reload();
                }}
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        context={"Comment"}
      />
    </div>
  );
};

export default DiscussionMidSection;
