import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const searchMovies = async (query: string): Promise<Movie[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies?search=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
}