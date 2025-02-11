import axios from 'axios';

const API_BASE_URL = '/api';

interface RegisterData {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const registerUser = async (userData: RegisterData) => {
    try {
        // Get CSRF cookie
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

        // Perform registration
        const response = await axios.post(`${API_BASE_URL}/register`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Server responded with:', error.response.data);
            throw error.response.data;
        }
        throw new Error('An unexpected error occurred');
    }
};