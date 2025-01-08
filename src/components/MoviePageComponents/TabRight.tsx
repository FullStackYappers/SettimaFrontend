import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface Discussion {
  id: number;
  title: string;
  views: number;
  comments_count: number;
}

const TabRight = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const { movieId } = useParams();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    const fetchDiscussion = async () => {
      console.log("discussion api called.");
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/${movieId}/discussions`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDiscussions(data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message as Error);
      }
    };

    fetchDiscussion();
  }, [movieId]);

  const getDiscussions = (): JSX.Element[] => {
    return discussions.length > 0
      ? discussions.map((discussion, index) => (
          <div
            key={index}
            className="discussion-item bg-base-100 p-4 gap-10 rounded-custom flex flex-row w-full items-center"
          >
            <div className="grow">
              <Link to={`/forum/${discussion.id}`}>
                <p className="text-xl font-semibold flex-1 m-0 pl-10">
                  {discussion.title}
                </p>
              </Link>
            </div>

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
        ))
      : [<p key="no-discussions">No discussions available</p>];
  };

  return (
    <div className="tab-section-right overflow-visible bg-secondary rounded-custom w-full">
      <div className="flex flex-wrap gap-1 text-lg font-semibold">
        <button
          className={`mt-3 p-2 rounded-custom flex-grow hover:text-accent2 ${
            activeTab === "tab1" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Average Ratings
        </button>
        <button
          className={`mt-3 p-2 rounded-custom flex-grow hover:text-accent2 ${
            activeTab === "tab2" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Following
        </button>
        <button
          className={`mt-3 p-2 rounded-custom flex-grow hover:text-accent2 ${
            activeTab === "tab3" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab3")}
        >
          Discussion
        </button>
        <button
          className={`mt-3 p-2 rounded-custom text-lg font-semibold flex-grow hover:text-accent2 ${
            activeTab === "tab4" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab4")}
        >
          Reviews
        </button>
      </div>

      <div className="mt-4 font-semibold ">
        {activeTab === "tab1" && (
          <div id="tab1" className="tab-content block mb-4">
            <p>Actor 1</p>
            <p>Actor 2</p>
            <p>Actor 3</p>
          </div>
        )}
        {activeTab === "tab2" && (
          <div id="tab2" className="tab-content block mb-4">
            <p>Crew Member 1</p>
            <p>Crew Member 2</p>
            <p>Crew Member 3</p>
          </div>
        )}
        {activeTab === "tab3" && (
          <div id="tab3" className="tab-content block mb-4">
            <div className=" flex justify-center items-center">
              <div className="discussions-container w-[90%] flex flex-col justify-center gap-4">
                {getDiscussions()}
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab4" && (
          <div id="tab4" className="tab-content block mb-4">
            <p>Your Review</p>
            <p>Other Reviews</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabRight;
