import axios from "axios";

const API_BASE_URL = '/api'

export const getAuthToken = () => {
    return localStorage.getItem("auth_token");
};

export const fetchDiscussionDetails = async (discussionId: string) => {
    try {

        const response = await axios.get(
            `${API_BASE_URL}/discussions/${discussionId}`
        );

        const discussionData = response.data;

        return discussionData;
    } catch (error) {
      console.error("Error fetching discussion details:", error);
    }
};

  export const fetchDiscussionLoggedIn = async (discussionId: string) => {
    try {
        const token = getAuthToken();
        
        const headers = token ? {
            Authorization: `Bearer ${token}`,
        } : {};

        const response = await axios.get(
            `${API_BASE_URL}/discussions/${discussionId}/loggedIn`, { headers }
        );

        const discussionData = response.data;

        return discussionData;
    } catch (error) {
        console.error("Error fetching discussion details:", error);
    }
};

  export const searchTags = async (query: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tags?search=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        console.error('Error searching tags:', error);
        throw error;
    }
};