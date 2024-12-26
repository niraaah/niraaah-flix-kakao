import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TMDbAPI from '../services/URL.ts';
import MovieSlider from '../components/MovieSlider';
import MovieModal from '../components/MovieModal';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bannerMovie, setBannerMovie] = useState(null); // 메인 배너 영화
  const [popularMovies, setPopularMovies] = useState([]); // 인기 영화
  const [genreMovies, setGenreMovies] = useState([]); // 로드된 장르별 영화
  const [loadedGenres, setLoadedGenres] = useState([]); // 이미 로드된 장르
  const [genres, setGenres] = useState([]); // 전체 장르 목록
  const [wishlist, setWishlist] = useState([]); // 찜 목록
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [apiKey, setApiKey] = useState(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return loggedInUser?.apiKey || null;
  });

  // localStorage 변경 감지를 위한 이벤트 리스너 추가
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      setApiKey(loggedInUser?.apiKey || null);
    };

    window.addEventListener('storage', handleStorageChange);
    // 컴포넌트 마운트 시에도 한번 체크
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (location.state?.apiKey) {
      setApiKey(location.state.apiKey);
      // localStorage에도 업데이트
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
      loggedInUser.apiKey = location.state.apiKey;
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }
  }, [location.state]);

  // 찜 목록 로드 함수
  const loadWishlist = () => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  };

  useEffect(() => {
    loadWishlist(); // 초기 로드 시 찜 목록 가져오기
  }, []);
  
  useEffect(() => {
    const checkAuth = () => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!loggedInUser || !apiKey) {
        window.location.href = '/niraaah-flix-kakao/#/signin';
      }
    };

    checkAuth();
  }, [apiKey]);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!apiKey) return;
      
      try {
        setIsLoading(true);
        const popularData = await TMDbAPI.getPopularMovies(apiKey);
        setPopularMovies(popularData.results.slice(0, 10));
        setBannerMovie(
          popularData.results[Math.floor(Math.random() * popularData.results.length)]
        );

        const genreData = await TMDbAPI.getGenres(apiKey);
        setGenres(genreData.genres);
        
        // 처음 5개 장르만 로드
        const initialGenres = genreData.genres.slice(0, 5);
        await loadNextGenres(initialGenres);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [apiKey]); // apiKey가 변경될 때마다 실행

  const loadNextGenres = async (nextGenres) => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      const newGenreMovies = [];
      // 현재 로드된 모든 장르 ID를 Set으로 관리
      const loadedGenreIds = new Set(genreMovies.map(genre => genre.genreId));
      
      // 아직 로드되지 않은 ���르만 필터링
      const uniqueGenres = nextGenres.filter(genre => !loadedGenreIds.has(genre.id));
      
      for (const genre of uniqueGenres) {
        const movies = await TMDbAPI.getMoviesByGenre(apiKey, genre.id);
        newGenreMovies.push({ 
          genreName: genre.name, 
          genreId: genre.id,
          movies: movies.results.slice(0, 10)
        });
      }
      
      if (newGenreMovies.length > 0) {
        setGenreMovies(prev => {
          // 다시 한번 중복 체크
          const existingIds = new Set(prev.map(g => g.genreId));
          const uniqueNewGenres = newGenreMovies.filter(g => !existingIds.has(g.genreId));
          return [...prev, ...uniqueNewGenres];
        });
        setLoadedGenres(prev => {
          const existingIds = new Set(prev.map(g => g.id));
          const uniqueNewLoadedGenres = uniqueGenres.filter(g => !existingIds.has(g.id));
          return [...prev, ...uniqueNewLoadedGenres];
        });
      }
    } catch (error) {
      console.error('Error loading genre movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 무한 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200 &&
      !isLoading
    ) {
      // 이미 로드된 모든 장르 ID를 Set으로 관리
      const loadedIds = new Set([
        ...genreMovies.map(genre => genre.genreId),
        ...loadedGenres.map(genre => genre.id)
      ]);
      
      // 아직 로드되지 않은 장르만 필터링
      const remainingGenres = genres.filter(genre => !loadedIds.has(genre.id));

      if (remainingGenres.length > 0) {
        loadNextGenres(remainingGenres.slice(0, 3));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [genres, genreMovies, loadedGenres, isLoading]);

  const handleMovieClick = (movie) => {
    const fetchWishlist = () => {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(storedWishlist);
    };
    fetchWishlist();
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
    const updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(updatedWishlist);
  };

  const handleWishlistToggle = (movie) => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isWishlisted = storedWishlist.some((item) => item.id === movie.id);

    if (isWishlisted) {
      const updatedWishlist = storedWishlist.filter((item) => item.id !== movie.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } else {
      storedWishlist.push(movie);
      localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
    }
    loadWishlist();
  };

  useEffect(() => {
    if (!isModalOpen) {
      loadWishlist();
    }
  }, [isModalOpen]);

  return (
    <div className="home">
      {bannerMovie && (
        <div
          className="banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path})`,
          }}
        >
          <div className="banner-overlay">
            <div className="banner-content">
              <h1>{bannerMovie.title}</h1>
              <p>{bannerMovie.overview}</p>
              <div className="banner-buttons">
                <button className="play-button" onClick={() => alert('재생 기능은 아직 구현되지 않았습니다.')}>
                  재생
                </button>
                <button
                  className="details-button"
                  onClick={() => handleMovieClick(bannerMovie)}
                >
                  상세 정보
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 인기 영화 슬라이더 */}
      <div className="slider-section">
        <h2>지금 뜨는 콘텐츠</h2>
        <MovieSlider 
          movies={popularMovies} 
          onMovieClick={handleMovieClick}
          handleWishlistToggle={handleWishlistToggle}
          wishlist={wishlist}
        />
      </div>

      {/* 장르별 영화 슬라이더 */}
      {genreMovies.map(({ genreName, genreId, movies }, index) => (
        <div key={`genre-${genreId}-${index}`} className="slider-section">
          <h2>{genreName}</h2>
          <MovieSlider
            movies={movies}
            onMovieClick={handleMovieClick}
            handleWishlistToggle={handleWishlistToggle}
            wishlist={wishlist}
          />
        </div>
      ))}
      
      {isLoading && <p>로딩 중...</p>}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;