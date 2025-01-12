//Styles
import "./css/ForumPage.css";

//Componenets
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Discussion from "../components/ForumPageComponents/DiscussionBox";
import DiscussionMidSection from "../components/ForumPageComponents/DiscussionMidSection";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { discussionDetails } from "../types/Forum";

const ForumPage = () => {
  const { discussionId } = useParams<{ discussionId: string }>();
  const [discussion, setDiscussion] = useState<discussionDetails>(
    {} as discussionDetails
  );

  useEffect(() => {
    const fetchDiscussionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/discussions/${discussionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch discussion details");
        }
        const discussionData = await response.json();
        setDiscussion(discussionData);
      } catch (error) {
        console.error("Error fetching discussion details:", error);
      }
    };

    if (discussionId) {
      fetchDiscussionDetails();
    }
  }, [discussionId]);

  return (
    <>
      <Navbar />
      <div className="forum-container w-full flex justify-center">
        <div className="forum-box w-[90%] h-[1000px] bg-accent p-8 rounded-custom text-primary">
          <Discussion discussionDetails={discussion} />
          <DiscussionMidSection discussionDetails={discussion} />
        </div>
      </div>
    </>
  );
};

export default ForumPage;
