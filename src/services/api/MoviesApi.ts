import { Movie, LatestMovie, MoviePageFields } from '../../types/Movie.ts';
import axios from "axios";

const API_BASE_URL = '/api';

export const searchMovies = async (query: string): Promise<Movie[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies?search=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

export const fetchRandomMovies = async (limit: number = 12): Promise<Movie[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/movies/random`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data: Movie[] = await response.json();
        return data.slice(0, limit);
    } catch (error) {
        console.error("Error fetching random movies:", error);
        throw error;
    }
};

export const fetchMoviesByGenre = async (genre: string, limit: number = 12): Promise<Movie[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/genres/${genre}/movies`);

        const contentType = response.headers.get("content-type");

        const text = await response.text();

        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = JSON.parse(text);

            if (response.ok) {
                return data.movies.slice(0, limit);
            } else {
                throw new Error(data.message || 'Unknown error occurred');
            }
        } else {
            console.error('Received non-JSON response:', text);
            throw new Error('Received non-JSON response from server');
        }
    } catch (error) {
        console.error("Error fetching movies by genre:", error);
        throw error;
    }
};

export const fetchLatestMovies = async (): Promise<LatestMovie[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/movies`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data: LatestMovie[] = await response.json();
        return data
            .sort((a, b) => b.release_year - a.release_year)
            .slice(0, 12);
    } catch (error) {
        console.error("Error fetching latest movies:", error instanceof Error ? error.message : String(error));
        return [];
    }
};

export const fetchMovieById = async (movieId: string): Promise<MoviePageFields> => {
    try {
        const response = await fetch(`${API_BASE_URL}/movies/${movieId}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching movie by ID:", error);
        throw error;
    }
};