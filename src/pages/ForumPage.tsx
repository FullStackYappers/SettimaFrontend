//Styles
import "./css/ForumPage.css";

//Componenets
import Navbar from "../components/Navbar/Navbar";
import Discussion from "../components/ForumPageComponents/DiscussionBox";
import DiscussionMidSection from "../components/ForumPageComponents/DiscussionMidSection";
import DiscussionComments from "../components/ForumPageComponents/DiscussionComments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../services/api/ForumApi.ts";

import { DiscussionDetails } from "../types/Forum";
import {
  fetchDiscussionDetails,
  fetchDiscussionLoggedIn,
} from "../services/api/ForumApi.ts";

const ForumPage = () => {
  const { discussionId } = useParams<{ discussionId: string }>();
  const [discussion, setDiscussion] = useState<DiscussionDetails>(
    {} as DiscussionDetails
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    const getDiscussionDetails = async () => {
      try {
        if (discussionId) {
          const token = getAuthToken();

          let discussionData;

          if (token) {
            discussionData = await fetchDiscussionLoggedIn(discussionId);
          } else {
            discussionData = await fetchDiscussionDetails(discussionId);
          }

          setDiscussion(discussionData);
        }
      } catch (error) {
        console.error("Error fetching discussion details:", error);
      }
    };

    getDiscussionDetails();
  }, [discussionId]);

  return (
    <>
      <Navbar />
      <div className="forum-container w-full flex justify-center">
        <div className="forum-box w-[90%] h-max-none bg-accent p-8 rounded-custom text-primary">
          <Discussion discussionDetails={discussion} />
          <DiscussionMidSection discussionDetails={discussion} />
          <DiscussionComments discussionDetails={discussion} />
        </div>
      </div>
    </>
  );
};

export default ForumPage;
