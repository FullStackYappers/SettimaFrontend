import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { loginUser } from "../../services/api/LoginApi.ts";
import { fetchUserData } from "../../services/api/UserApi.ts";
import { Link } from "react-router-dom";

import { DiscussionComment, CommentReply } from "../../types/Forum";

const DiscussionComments = ({
  discussionDetails,
}: {
  discussionDetails: any;
}) => {
  const [likedComment, setLikedComment] = useState<{
    [key: number]: boolean;
  }>({});
  const [likedReply, setLikedReply] = useState<{
    [key: number]: boolean;
  }>({});

  const [isReplyModalOpen, setIsReplyModalOpen] = useState<{
    [key: number]: boolean;
  }>({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn, login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const username = user?.username;

  const handleReplyModal = (commentId: number) => {
    if (isLoggedIn) {
      setIsReplyModalOpen((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }));
    } else {
      setIsLoginModalOpen(!isLoginModalOpen);
    }
  };

  useEffect(() => {
    if (discussionDetails?.comments) {
      const replyModals = discussionDetails.comments.map(
        (comment: DiscussionComment) => {
          const replyModal = document.getElementById(
            "reply_modal_${comment.id}"
          ) as HTMLDialogElement;
          if (replyModal) {
            if (isReplyModalOpen[comment.id]) {
              replyModal.showModal();
            } else {
              replyModal.close();
            }
          }
        }
      );

      const loginModal = document.getElementById(
        "login_modal_reply"
      ) as HTMLDialogElement;

      if (loginModal) {
        if (isLoginModalOpen) {
          loginModal.showModal();
        } else {
          loginModal.close();
        }
      }
    }
  }, [isReplyModalOpen, isLoginModalOpen, discussionDetails?.comments]);

  const handleReplyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginResponse = await loginUser({ email, password });
      if (loginResponse.token) {
        const userData = await fetchUserData(loginResponse.token);
        login(userData, loginResponse.token);
        setIsLoginModalOpen(false);
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

  const handleLikeToggleComment = (commentId: number) => {
    setLikedComment((prev) => {
      if (typeof prev !== "object") return {};
      return {
        ...prev,
        [commentId]: !prev[commentId],
      };
    });
  };

  const handleLikeToggleReply = (replyId: number) => {
    setLikedReply((prev) => {
      if (typeof prev !== "object") return {};
      return {
        ...prev,
        [replyId]: !prev[replyId],
      };
    });
  };

  const getComments = (): JSX.Element[] => {
    return discussionDetails.comments_count > 0
      ? discussionDetails.comments.map((comment: DiscussionComment) => (
          <div key={comment.id}>
            <div className="discussion-post-content w-full flex justify-left px-8 p-4">
              <div className="box bg-base-100 rounded-custom w-[90%] p-4">
                <div className="flex flex-row">
                  <div className="user-name grow">
                    <div className="name text-xl ml-10 h-full flex items-center">
                      {comment.user.name}
                    </div>
                  </div>
                  <div className="like-button mr-4">
                    <button
                      onClick={() => handleLikeToggleComment(comment.id)}
                      className={`btn btn-secondary rounded-custom likedbtn ${
                        likedComment[comment.id]
                          ? "text-accent2"
                          : "text-primary"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={
                          likedComment[comment.id] ? "currentColor" : "none"
                        }
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                      <span className="block">{comment.likes_count}</span>
                    </button>
                  </div>
                </div>
                <div className="discussion-content ml-10 mt-4">
                  <div className="content-text text-xl w-[85%] py-3">
                    {comment.content}
                  </div>
                </div>

                <div className="comment-mid-container w-full flex ml-10 mt-4">
                  <div className="comment-mid-section w-[90%]">
                    <div className="reply-button flex justify-start">
                      <button
                        className="btn btn-secondary rounded-custom text-base"
                        onClick={() => handleReplyModal(comment.id)}
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
                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                          />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </div>

                  <dialog
                    id={"reply_modal_${comment.id}"}
                    className="modal rounded-custom"
                  >
                    <div className="modal-box w-[75vw] max-w-none h-[60vh] max-h-none bg-base-100 relative">
                      <form method="dialog">
                        <div>
                          <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
                            onClick={() => handleReplyModal(comment.id)}
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
                          Reply as {username}
                        </h2>

                        <div className="flex-grow mb-4 mx-4">
                          <textarea
                            className="textarea placeholder-primary placeholder-opacity-50 bg-secondary w-full h-[90%] text-xl overflow-auto resize-none"
                            placeholder="Write your reply here..."
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            className="btn btn-ghost bottom-3 right-3 absolute rounded-custom"
                            onClick={() => handleReplyModal(comment.id)}
                          >
                            {" "}
                            Submit{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>

                  <dialog id="login_modal_reply" className="modal">
                    <div className="modal-box w-[30vw] max-w-none h-[60vh] max-h-none bg-base-100 relative rounded-custom">
                      <form method="dialog">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
                          onClick={() => handleReplyModal(comment.id)}
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
                          Login to Reply
                        </h2>

                        <form
                          className="w-full px-4"
                          onSubmit={handleReplyLogin}
                        >
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
                          <p className="text-red-500 text-center mt-4">
                            {" "}
                            {error}{" "}
                          </p>
                        )}
                      </div>
                    </div>
                  </dialog>
                </div>
                <div className="replies flex flex-col w-full ml-20 pl-2">
                  {getReplies(comment.replies)}
                </div>
              </div>
            </div>
          </div>
        ))
      : [<div className="no-comments"></div>];
  };

  const getReplies = (replies: CommentReply[]): JSX.Element[] => {
    return replies.length > 0
      ? replies.map((reply: CommentReply) => (
          <div className="flex py-4 text text-base w-[80%]">
            <div key={reply.id} className="grow">
              <div className="comment-reply w-full bg-accent rounded-custom my-2 p-4">
                <div className="flex flex-row">
                  <div className="user-name grow">
                    <div className="name text-xl ml-5 h-full flex items-center">
                      {reply.user.name}
                    </div>
                  </div>
                  <div className="like-button mr-4">
                    <button
                      onClick={() => handleLikeToggleReply(reply.id)}
                      className={`btn btn-base-100 rounded-custom likedbtn ${
                        likedReply[reply.id] ? "text-accent2" : "text-primary"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={likedReply[reply.id] ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                      <span className="block">{reply.likes_count}</span>
                    </button>
                  </div>
                </div>
                <div className="reply-content py-3 w-[83%] ml-5 mt-2">
                  {reply.content}
                </div>
              </div>
            </div>
          </div>
        ))
      : [<div className="no-replies"></div>];
  };

  return (
    <div className="Comments and Replies">
      <div className="Comments">{getComments()}</div>
    </div>
  );
};

export default DiscussionComments;
