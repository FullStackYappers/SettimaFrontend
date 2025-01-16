import axios from 'axios';

const API_BASE_URL = '/api';

export const fetchUserData = async (token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};