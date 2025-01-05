export interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export interface LatestMovie extends Movie {
    release_year: number;
}