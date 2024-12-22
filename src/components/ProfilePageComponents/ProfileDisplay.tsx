import "./ProfileDisplay.css";
import TabContent from "./TabContent";

const ProfileDisplay = () => {
  return (
    <div className="display-container">
      <div className="tabs">
        <TabContent />
      </div>
      <div className="movieContainer">
        <div className="movieDisplay">Total Movies</div>
        <div className="favMovie">Favorite Movies</div>
      </div>
      <div className="activity">Activity</div>
    </div>
  );
};

export default ProfileDisplay;
