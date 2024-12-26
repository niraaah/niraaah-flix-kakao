import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieSlider.css';

const MovieSlider = ({ title, movies, onMovieClick, handleWishlistToggle, wishlist }) => {
    return (
        <div className="movie-slider">
            <h2>{title}</h2>
            <div className="slider-container">
                {movies.map((movie) => (
                    <MovieCard
                        key={`${movie.id}-${wishlist.some((item) => item.id === movie.id)}`}
                        movie={movie}
                        isWishlisted={wishlist.some((item) => item.id === movie.id)}
                        onClick={() => onMovieClick(movie)}
                        onWishlistToggle={handleWishlistToggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieSlider;
