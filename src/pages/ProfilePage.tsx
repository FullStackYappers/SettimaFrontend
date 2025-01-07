import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./css/ProfilePage.css";
import Navbar from "../components/Navbar/Navbar";
import ProfileDisplay from "../components/ProfilePageComponents/ProfileDisplay";

const ProfilePage: React.FC = () => {
  const { user, isLoading, isLoggedIn } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    console.log("ProfilePage mounted");
    console.log("User in ProfilePage:", user);
    console.log("Is logged in:", isLoggedIn);
    console.log("Is loading:", isLoading);

    // Add this new API call
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);

    if (token) {
      fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
          .then(response => response.json())
          .then(data => {
            console.log("User data from API:", data);
            if (!data || !data.id) {
              console.log("Invalid user data, setting shouldRedirect to true");
              setShouldRedirect(true);
            }
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
            setShouldRedirect(true);
          });
    } else {
      console.log("No token found, setting shouldRedirect to true");
      setShouldRedirect(true);
    }
  }, [user, isLoading, isLoggedIn]);

  if (isLoading) {
    console.log("Still loading, showing loading message");
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || !user || shouldRedirect) {
    console.log('Not logged in, no user, or shouldRedirect is true. Redirecting to login');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('user:', user);
    console.log('shouldRedirect:', shouldRedirect);
    return <Navigate to="/login" />;
  }

  console.log('Rendering ProfilePage with user:', user);
  return (
    <>
      <Navbar />
      <div className="profile-grid-container text-primary">
        <div className="profilepic">
          {user.profile_picture ? (
              <img src={user.profile_picture} alt="Profile" className="h-36 w-36 rounded-full" />
          ) : (
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
          )}
        </div>
        <div className="username font-semibold">{user.username}</div>
        <div className="name">{user.name}</div>
        <div className="email">{user.email}</div>
        <div className="about">{user.about || 'No bio available'}</div>
        <div className="profileDisplay">
          <ProfileDisplay/>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
