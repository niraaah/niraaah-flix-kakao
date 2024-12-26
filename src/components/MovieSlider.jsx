import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieSlider.css';

const MovieSlider = ({ title, movies, onMovieClick }) => {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    // Check if a movie is in the wishlist
    const isMovieWishlisted = (movieId) => {
        return wishlist.some((item) => item.id === movieId);
    };

    return (
        <div className="movie-slider">
            <h2>{title}</h2>
            <div className="slider-container">
                {movies.map((movie) => (
                    <MovieCard
                        key={`${movie.id}-${wishlist.some((item) => item.id === movie.id)}`} // Ensure re-render on wishlist changes
                        movie={movie}
                        isWishlisted={wishlist.some((item) => item.id === movie.id)} // Pass wishlist status to MovieCard
                        onClick={() => onMovieClick(movie)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieSlider;
