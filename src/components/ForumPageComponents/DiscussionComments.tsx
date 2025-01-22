import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { likeItem, unlikeItem } from "../../services/api/LikeApi.ts";
import axios from "axios";

import { DiscussionComment, CommentReply } from "../../types/Forum";
import LoginModal from "./LoginModal.tsx";

const DiscussionComments = ({
  discussionDetails,
}: {
  discussionDetails: any;
}) => {
  const [likedComment, setLikedComment] = useState<{
    [key: number]: boolean;
  }>({});
  const [likedCommentCount, setLikedCommentCount] = useState<{
    [key: number]: number;
  }>({});

  const [likedReply, setLikedReply] = useState<{
    [key: number]: boolean;
  }>({});
  const [likedReplyCount, setLikedReplyCount] = useState<{
    [key: number]: number;
  }>({});

  const [replies, setReplies] = useState<{ [key: number]: string }>({});

  const [isReplyModalOpen, setIsReplyModalOpen] = useState<{
    [key: number]: boolean;
  }>({});

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const username = user?.username;

  const [context, setContext] = useState("");

  useEffect(() => {
    if (discussionDetails?.comments) {
      const initialLikedCommentState: { [key: number]: boolean } = {};
      const initialLikedCommentCountState: { [key: number]: number } = {};
      const initialLikedReplyState: { [key: number]: boolean } = {};
      const initialLikedReplyCountState: { [key: number]: number } = {};

      discussionDetails.comments.forEach((comment: DiscussionComment) => {
        initialLikedCommentState[comment.id] = comment.user_liked;
        initialLikedCommentCountState[comment.id] = comment.likes_count;
        comment.replies.forEach((reply: CommentReply) => {
          initialLikedReplyState[reply.id] = reply.user_liked;
          initialLikedReplyCountState[reply.id] = reply.likes_count;
        });
      });

      setLikedComment(initialLikedCommentState);
      setLikedCommentCount(initialLikedCommentCountState);
      setLikedReply(initialLikedReplyState);
      setLikedReplyCount(initialLikedReplyCountState);
    }
  }, [discussionDetails]);

  const handleLoginModalOpen = (actionContext: string) => {
    setContext(actionContext);
    setIsLoginModalOpen(true);
  };

  const handleLikeToggleComment = async (commentId: number) => {
    if (!isLoggedIn) {
      handleLoginModalOpen("Like");
      return;
    }

    const newLikedState = !likedComment[commentId];
    setLikedComment((prev) => ({
      ...prev,
      [commentId]: newLikedState,
    }));

    try {
      if (newLikedState) {
        await likeItem("App\\Models\\Comment", commentId);
        setLikedCommentCount((prevCounts) => ({
          ...prevCounts,
          [commentId]: (prevCounts[commentId] || 0) + 1,
        }));
      } else {
        unlikeItem("App\\Models\\Comment", commentId);
        setLikedCommentCount((prevCounts) => ({
          ...prevCounts,
          [commentId]: Math.max((prevCounts[commentId] || 0) - 1, 0),
        }));
      }
    } catch (error) {
      setLikedComment((prev) => ({
        ...prev,
        [commentId]: !newLikedState,
      }));
      console.error("Error updating comment like: ", error);
    }
  };

  const handleLikeToggleReply = async (replyId: number) => {
    if (!isLoggedIn) {
      handleLoginModalOpen("Like");
      return;
    }

    const newLikedState = !likedReply[replyId];
    setLikedReply((prev) => ({
      ...prev,
      [replyId]: newLikedState,
    }));

    try {
      if (newLikedState) {
        await likeItem("App\\Models\\Reply", replyId);
        setLikedReplyCount((prevCounts) => ({
          ...prevCounts,
          [replyId]: (prevCounts[replyId] || 0) + 1,
        }));
      } else {
        await unlikeItem("App\\Models\\Reply", replyId);
        setLikedReplyCount((prevCounts) => ({
          ...prevCounts,
          [replyId]: Math.max((prevCounts[replyId] || 0) - 1, 0),
        }));
      }
    } catch (error) {
      setLikedReply((prev) => ({
        ...prev,
        [replyId]: !newLikedState,
      }));
      console.error("Error updating reply like: ", error);
    }
  };

  const handleReplyModal = (commentId: number) => {
    if (isLoggedIn) {
      setIsReplyModalOpen((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }));
    } else {
      handleLoginModalOpen("Reply");
    }
  };

  const addReply = async (commentId: number, content: string) => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      console.error("User not authenticated");
      return;
    }

    const payload = { content };

    try {
      const response = await axios.post(
        `/api/comments/${commentId}/replies`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Reply Added: ", response.data);
    } catch (error) {
      console.error("Error adding reply: ", error);
    }
  };

  const handleReplySubmission = (commentId: number) => {
    if (replies[commentId]?.trim()) {
      addReply(commentId, replies[commentId].trim());
      setReplies((prev) => ({ ...prev, [commentId]: "" }));
    }
  };

  useEffect(() => {
    if (discussionDetails?.comments) {
      discussionDetails.comments.map((comment: DiscussionComment) => {
        const replyModal = document.getElementById(
          `reply_modal_${comment.id}`
        ) as HTMLDialogElement;
        if (replyModal) {
          if (isReplyModalOpen[comment.id]) {
            replyModal.showModal();
          } else {
            replyModal.close();
          }
        }
      });

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

  const getComments = (): JSX.Element[] => {
    return discussionDetails.comments_count > 0
      ? discussionDetails.comments.map((comment: DiscussionComment) => (
          <div key={comment.id}>
            <div className="discussion-comments-replies w-full flex justify-left px-4 md:px-8 p-2 md:p-4">
              <div className="box bg-base-100 rounded-custom w-full md:w-[90%] p-4">
                <div className="flex flex-row">
                  <div className="user-name grow">
                    <div className="name text-base md:text-xl ml-10 h-full flex items-center">
                      {comment.user.username}
                    </div>
                  </div>
                  <div className="hidden min-[425px]:block like-button mr-4">
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
                      <span>{likedCommentCount[comment.id]}</span>
                    </button>
                  </div>
                </div>
                <div className="discussion-content ml-10 mt-4">
                  <div className="content-text text-base md:text-xl w-[85%] py-3">
                    {comment.content}
                  </div>
                </div>
                <div className="comment-mid-container w-full flex ml-10 mt-4">
                  <div className="comment-mid-section w-[90%]">
                    <div className="reply-button flex min-[425px]:justify-start">
                      <div className="like-button block min-[425px]:hidden like-button mr-2">
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
                            className="inline-block h-3 w-3 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                          <span className="text-sm">
                            {likedCommentCount[comment.id]}
                          </span>
                        </button>
                      </div>
                      <button
                        className="btn btn-secondary rounded-custom text-xs md:text-base"
                        onClick={() => handleReplyModal(comment.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-3 min-[425px]:size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                          />
                        </svg>
                        <span className="text-sm">Reply</span>
                      </button>
                    </div>
                  </div>

                  <dialog
                    id={`reply_modal_${comment.id}`}
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
                        <h2 className="text-xl min-[425px]:text-2xl md:text-4xl font-semibold font-outfit ml-1 min-[425px]:ml-4 mb-4">
                          Reply as {username}
                        </h2>

                        <div className="flex-grow mb-1 min[425px]:mb-4 mx-1 min-[425px]:mx-4">
                          <textarea
                            className="textarea placeholder-primary placeholder-opacity-50 bg-secondary w-full h-[90%] text-base min-[425px]:text-xl overflow-auto resize-none"
                            placeholder="Write your reply here..."
                            value={replies[comment.id] || ""}
                            onChange={(e) =>
                              setReplies((prev) => ({
                                ...prev,
                                [comment.id]: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            className="btn btn-ghost bottom-3 right-3 absolute rounded-custom text-base min-[425px]:text-xl"
                            onClick={() => {
                              handleReplySubmission(comment.id);
                              window.location.reload();
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>

                  <LoginModal
                    isOpen={isLoginModalOpen}
                    onClose={() => setIsLoginModalOpen(false)}
                    context={context}
                  />
                </div>
                <div className="replies flex flex-col w-full ml-5 min-[425px]:ml-10 md:ml-20 pl-2">
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
          <div className="flex py-4 text text-base md:text-xl w-[90%] md:w-[80%]">
            <div key={reply.id} className="grow">
              <div className="comment-reply w-full bg-accent rounded-custom my-1 min-[425px]:my-2 p-2 min-[425px]:p-4">
                <div className="flex flex-row">
                  <div className="user-name grow">
                    <div className="name ml-5 py-2 h-full flex items-center">
                      {reply.user.username}
                    </div>
                  </div>
                  <div className="hidden min-[425px]:block like-button mr-4">
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
                      <span>{likedReplyCount[reply.id]}</span>
                    </button>
                  </div>
                </div>
                <div className="reply-content py-2 w-[83%] ml-5 mt-2">
                  {reply.content}
                </div>
                <div className="block min-[425px]:hidden like-button ml-5 mt-2">
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
                      className="inline-block h-3 w-3 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <span className="text-sm">{likedReplyCount[reply.id]}</span>
                  </button>
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
