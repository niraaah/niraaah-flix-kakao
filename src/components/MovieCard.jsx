import React from 'react';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, onClick, onWishlistToggle, isWishlisted }) => {
  const { poster_path, title, id } = movie;

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onWishlistToggle(movie);
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title || "Movie Poster"}
        className={`movie-poster ${isWishlisted ? 'wishlisted' : ''}`}
        onClick={onClick}
      />
      <div className="movie-details">
        <button
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={handleWishlistClick}
        >
          {isWishlisted ? '✅ 찜 완료' : '찜하기'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
