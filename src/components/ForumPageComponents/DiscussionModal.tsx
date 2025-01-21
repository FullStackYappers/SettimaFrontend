import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.tsx";
import { searchTags } from "../../services/api/ForumApi.ts";

interface DiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: string | undefined;
  username: string | undefined;
  //handleDiscussionSubmission: (selectedTags: string[]) => void;
}

const DiscussionModal: React.FC<DiscussionModalProps> = ({
  isOpen,
  onClose,
  movieId,
  username,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const discussionModal = document.getElementById(
      "discussion_modal"
    ) as HTMLDialogElement;

    if (discussionModal) {
      if (isOpen) {
        discussionModal.showModal();
      } else {
        discussionModal.close();
      }
    }
  }, [isOpen]);

  const handleTagInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setTagInput(e.target.value);

    if (inputValue.trim() !== "") {
      const tags = await searchTags(inputValue);
      setTagSuggestions(tags.map((tag: { name: string }) => tag.name));
    } else {
      setTagSuggestions([]);
    }
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagInput("");
    setTagSuggestions([]);
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const addDiscussion = async () => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      console.error("User not authenticated");
      return;
    }

    const payload = { title, content, tags: selectedTags };

    try {
      const response = await axios.post(
        `/api/movies/${movieId}/discussions`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Discussion Added: ", response.data);
    } catch (error) {
      console.error("Error adding discussion: ", error);
    }
  };

  const handleSubmission = () => {
    if ((content.trim() || content === "") && title.trim()) {
      setContent(content.trim());
      setTitle(title.trim());
      addDiscussion();
      onClose();
    }
  };

  return (
    <dialog id="discussion_modal" className="modal rounded-custom">
      <div className="modal-box w-[75vw] max-w-none h-[75vh] max-h-none bg-base-100 relative">
        <form method="dialog">
          <div>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
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
            Add Discussion as {username}
          </h2>
          <div className="add-title-textarea mx-4 mt-4">
            <span className="text-xl"> Title </span>
            <textarea
              className="textarea placeholder-primary placeholder-opacity-50 bg-secondary w-full h-[10%] text-xl overflow-auto resize-none mt-2"
              placeholder="Write your discussion title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="h-[40%] mb-8 mx-4">
            <span className="text-xl">Content</span>
            <textarea
              className="textarea placeholder-primary placeholder-opacity-50 bg-secondary w-full h-full text-xl overflow-auto resize-none mt-2"
              placeholder="Write your discussion content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="add-tags flex-grow mt-4 mx-4">
            <span className="text-xl"> Tags </span>
            <div className="flex flex-wrap mt-2">
              {selectedTags.map((tag) => (
                <div className="tag text-base mx-4 rounded-custom bg-accent2 p-2 px-4 flex justify-center align-center">
                  {tag}
                  <button
                    className="ml-2 text-white"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <input
              className="input placeholder-primary placeholder-opacity-50 bg-secondary w-full mt-2"
              placeholder="Search or add tags..."
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag(tagInput);
                }
              }}
            />
            {tagInput.trim() !== "" && tagSuggestions.length > 0 && (
              <div className="bg-secondary mt-2 rounded p-2 max-h-40 overflow-y-auto">
                <div className="flex flex-wrap">
                  {tagSuggestions.map((tag) => (
                    <div
                      key={tag}
                      className="tag text-base mx-1 mb-2 rounded-custom bg-accent2 p-2 flex items-center cursor-pointer"
                      onClick={() => handleAddTag(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="btn btn-ghost rounded-custom text-xl"
              onClick={() => {
                handleSubmission();
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
  );
};

export default DiscussionModal;
