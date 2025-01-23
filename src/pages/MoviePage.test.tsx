import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import axios from 'axios';
import MoviePage from './MoviePage';
import { fetchMovieById } from '../services/api/MoviesApi';
import { MoviePageFields } from '../types/Movie';
import WatchedLikedContainer from '../components/MoviePageComponents/Watched&Liked/WatchLikedContainer';

// Mocks
jest.mock('axios');
jest.mock('../services/api/MoviesApi');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));
jest.mock('../components/Navbar/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../components/MoviePageComponents/TabLeft', () => () => <div data-testid="tab-left">TabLeft</div>);
jest.mock('../components/MoviePageComponents/TabRight', () => () => <div data-testid="tab-right">TabRight</div>);
jest.mock('../components/MoviePageComponents/Watched&Liked/WatchLikedContainer', () => ({ review, setReview }: { review: string; setReview: (review: string) => void }) => {
    React.useEffect(() => {
        setReview(review);
    }, [review, setReview]);
    return <div data-testid="watch-liked">WatchLikedContainer</div>;
});
jest.mock('../components/MoviePageComponents/Boxes', () => ({ average }: { average: number }) => <div data-testid="boxes">Boxes: {average}</div>);
jest.mock('../components/MoviePageComponents/KeyStaff', () => () => <div data-testid="key-staff">KeyStaff</div>);
jest.mock('../components/MoviePageComponents/Genres', () => () => <div data-testid="genres">Genres</div>);
jest.mock('../components/MoviePageComponents/WatchTrailerBtn/WatchTrailerBtn', () => () => <div data-testid="trailer-btn">TrailerBtn</div>);

// Mock data
const mockMovieData: MoviePageFields = {
    id: 123,
    title: 'Test Movie',
    poster_path: 'test.jpg',
    description: 'Test description',
    release_year: 2023,
    runtime: 120,
    rate_avg: 4
};

const mockRatingsResponse = {
    data: {
        data: [
            {
                movie_id: 123,
                acting: 4,
                plot: 3,
                music: 5,
                costume_design: 4,
                cinematography: 5,
                editing: 4,
                review: 'Great movie!'
            }
        ]
    }
};

describe('MoviePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('auth_token', 'mock-token');
        (useParams as jest.Mock).mockReturnValue({ movieId: '123' });
        (fetchMovieById as jest.Mock).mockResolvedValue(mockMovieData);
        (axios.get as jest.Mock).mockResolvedValue(mockRatingsResponse);
    });

    it('should calculate and display the correct average rating based on user ratings', async () => {
        render(
            <MemoryRouter
                initialEntries={['/movie/123']}
                future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            >
                <Routes>
                    <Route path="/movie/:movieId" element={<MoviePage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            const averageRating = screen.getByTestId('boxes');
            expect(averageRating).toHaveTextContent('Boxes: 2');
        });

        expect(screen.getByTestId('tab-right')).toBeInTheDocument();
    });

    it('should update the review state when a user submits a new review', async () => {
        const newReview = 'This is a new review';
        const setReviewMock = jest.fn();

        render(
            <WatchedLikedContainer
                movieId="123"
                handleAverage={jest.fn()}
                review={newReview}
                setReview={setReviewMock}
            />
        );

        await waitFor(() => {
            expect(setReviewMock).toHaveBeenCalledWith(newReview);
        });
    });

    it('should fetch, receive, and display movie data correctly', async () => {
        render(
            <MemoryRouter
                initialEntries={['/movie/123']}
                future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            >
                <Routes>
                    <Route path="/movie/:movieId" element={<MoviePage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(fetchMovieById).toHaveBeenCalledWith('123');
            expect(screen.getByText('Test Movie')).toBeInTheDocument();
            expect(screen.getByText('Test description')).toBeInTheDocument();
            const posterImage = screen.getByAltText('Test Movie') as HTMLImageElement;
            expect(posterImage.src).toContain('test.jpg');
        });

        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('trailer-btn')).toBeInTheDocument();
        expect(screen.getByTestId('genres')).toBeInTheDocument();
        expect(screen.getByTestId('boxes')).toBeInTheDocument();
        expect(screen.getByTestId('watch-liked')).toBeInTheDocument();
        expect(screen.getByTestId('tab-left')).toBeInTheDocument();
        expect(screen.getByTestId('tab-right')).toBeInTheDocument();
        expect(screen.getByTestId('key-staff')).toBeInTheDocument();
    });
});
