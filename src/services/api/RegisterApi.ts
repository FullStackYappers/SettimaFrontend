import axios from 'axios';

interface RegisterData {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const axiosInstance = axios.create({
    withCredentials: true,
});

export const registerUser = async (userData: RegisterData) => {
    try {
        await axiosInstance.get('/sanctum/csrf-cookie');

        const response = await axiosInstance.post('/api/register', userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Server responded with:', error.response.data);
            throw error.response.data;
        }
        throw new Error('An unexpected error occurred');
    }
};