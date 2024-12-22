import "./css/ProfilePage.css";
import Navbar from "../components/Navbar/Navbar";
import ProfileDisplay from "../components/ProfilePageComponents/ProfileDisplay";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="profile-grid-container text-primary">
        <div className="profilepic">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-36 w-36 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div className="username font-semibold">Username</div>
        <div className="about">About</div>
        <div className="profileDisplay">
          <ProfileDisplay />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
