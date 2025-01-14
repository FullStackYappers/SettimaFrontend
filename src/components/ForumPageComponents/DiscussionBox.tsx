import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Tags } from "../../types/Forum";

const Discussion = ({ discussionDetails }: { discussionDetails: any }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate(); // Use React Router's navigation hook

  const handleClick = () => {
    navigate(`/movie/${discussionDetails.movie_id}`);
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

  const getTags = (): JSX.Element[] => {
    return discussionDetails.tags.length > 0
      ? discussionDetails.tags.map((tag: Tags, index: number) => (
          <div
            key={index}
            className="tag text-base mx-4 rounded-custom bg-accent2 p-2 w-[12%] flex justify-center align-center"
          >
            {tag.name}
          </div>
        ))
      : [<div className="no-tags"></div>];
  };

  return (
    <div className="forum-discussion-container">
      <div className="back-button">
        <button
          className="btn btn-ghost rounded-custom bottom-3 text-lg mb-4"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="inline-block h-6 w-6 stroke-current text-primary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back to Movie
        </button>
      </div>

      <div className="discussion-main-section pt-4">
        <div className="flex pt-4 pb-4">
          <div className="title flex-grow">
            <h2 className="text-4xl font-semibold flex-1 m-0 pl-10">
              {discussionDetails.title}
            </h2>
          </div>

          <div className="Views and Comments mr-16 flex items-center">
            <div className="pr-20 flex flex-row gap-2 items-end text-xl">
              <div className="flex items-center gap-1 mr-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="block">{discussionDetails.views}</span>
              </div>

              <div className="flex items-center gap-1">
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
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <span>{discussionDetails.comments_count}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="discussion-post-content w-full flex justify-left p-8">
          <div className="box bg-base-100 rounded-custom w-[90%] p-4">
            <div className="flex flex-row">
              <div className="user-name grow">
                <div className="name text-xl ml-10 h-full flex items-center">
                  {discussionDetails.user.name}
                </div>
              </div>
              <div className="like-button mr-4">
                <button
                  onClick={() => {
                    setLiked(!liked);
                  }}
                  className={`btn btn-secondary rounded-custom likedbtn ${
                    liked ? "text-accent2" : "text-primary"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={liked ? "currentColor" : "none"}
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
                  <span className="block">{discussionDetails.likes_count}</span>
                </button>
              </div>
            </div>
            <div className="discussion-content ml-10 mt-4">
              <div className="content-text text-xl w-[85%] py-3">
                {discussionDetails.content}
              </div>
            </div>
            <div className="tags flex flex-row justify-end mt-4">
              {getTags()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
