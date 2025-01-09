//Styles
import "./css/ForumPage.css";

//Componenets
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Discussion from "../components/ForumPageComponents/DiscussionBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Discussion {
  id: number;
  movie_id: number;
  user_id: number;
  title: string;
  content: string;
  views: number;
}

const ForumPage = () => {
  const { discussionId } = useParams<{ discussionId: string }>();
  const [discussion, setDiscussion] = useState<Discussion>({} as Discussion);

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
      <Discussion discussion={discussion} />
    </>
  );
};

export default ForumPage;
