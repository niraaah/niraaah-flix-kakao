import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import SignIn from './pages/SignIn';
import MovieDetails from './pages/MovieDetails';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import KakaoRedirect from './components/KakaoRedirect';

const ProtectedRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const location = useLocation();
  
  if (!loggedInUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
  if (loggedInUser) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const rememberedUser = JSON.parse(localStorage.getItem('rememberMe'));
      
      if (rememberedUser) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === rememberedUser.email);
        
        if (user && new Date().getTime() - rememberedUser.timestamp < 30 * 24 * 60 * 60 * 1000) {
          localStorage.setItem('loggedInUser', JSON.stringify({
            email: user.email,
            username: user.username,
            provider: user.provider,
            wishlist: user.wishlist || [],
            apiKey: process.env.REACT_APP_TMDB_API_KEY
          }));
        } else {
          localStorage.removeItem('rememberMe');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route 
          path="/signin" 
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          } 
        />
        <Route path="/redirect" element={<KakaoRedirect />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/popular" 
          element={
            <ProtectedRoute>
              <Popular />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/search" 
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/movie/:id" 
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;