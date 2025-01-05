export interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export interface LatestMovie extends Movie {
    release_year: number;
}

export interface MoviePageFields extends Movie {
    release_year: number;
    runtime: number;
    description: string;
    rate_avg: number;
    poster_path: string;
}