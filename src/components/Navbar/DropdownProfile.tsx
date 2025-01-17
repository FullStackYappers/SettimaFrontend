import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const DropdownProfile = () => {
  const { user, logout } = useAuth();
  const authToken = localStorage.getItem("auth_token");

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      logout();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-accent rounded-box z-[1] w-52 p-4 text-lg shadow text-primary"
    >
      {authToken ? (
        <>
          <li className="hover:text-accent2">
            <Link to={`/user/${user?.username || ""}`}>
              <span>Profile</span>
            </Link>
          </li>
          <li className="hover:text-accent2 ">
            <span>Settings</span>
          </li>
          <div className="divider divider-accent m-2"></div>
          <li className="hover:text-accent2">
            <span onClick={handleLogout}>Logout</span>
          </li>
        </>
      ) : (
        <Link to="/login">
          <li className="hover:text-accent2 hover:bg-primary rounded-[8px] hover:font-semibold">
            <span>Login / Signup</span>
          </li>
        </Link>
      )}
    </ul>
  );
};

export default DropdownProfile;
