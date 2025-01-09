import React from "react";
import { useEffect, useState } from "react";
import { GoDiscussionClosed } from "react-icons/go";
import { useParams } from "react-router-dom";

const Discussion = ({ discussion }: { discussion: any }) => {
  return (
    <div className="forum-box w-90 mx-[100px] h-[500px] bg-accent p-4 rounded-custom text-primary">
      <div className="back-button">
        <button
          className="btn btn-ghost rounded-custom bottom-3 text-lg mb-4"
          onClick={() => window.history.back()}
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

      <div className="discussion-main-section">
        <div className="title">
          <h2 className="text-4xl font-semibold flex-1 m-0 pl-10">
            {discussion.title}
          </h2>
        </div>
        <div className="Views and Comments">
          <div className="pr-20 flex flex-col gap-2 items-end">
            <div className="flex items-center gap-1">
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
              <span className="block">{discussion.views}</span>
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
              <span>{discussion.comments_count}</span>
            </div>
          </div>
        </div>
        <div className="discussion-post-content"></div>
      </div>

      <div className="discussion-mid-section">
        <div className="replies"></div>
        <div className="add-comment-button"></div>
      </div>

      <div className="discussion-comments">
        <div className="comments"></div>
      </div>
    </div>
  );
};

export default Discussion;
