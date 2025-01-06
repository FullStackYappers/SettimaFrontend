import axios from 'axios';

const API_BASE_URL = '/api';

interface LoginData {
    email: string;
    password: string;
}

export const loginUser = async (userData: LoginData) => {
    try {
        // Get CSRF cookie
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

        // Perform login
        const response = await axios.post(`${API_BASE_URL}/login`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Server responded with:', error.response.data);
            throw error.response.data;
        }
        throw new Error('An unexpected error occurred');
    }
};