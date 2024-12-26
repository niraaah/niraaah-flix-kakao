import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import ReactMarkdown from 'react-markdown';
import KakaoLogin from '../components/KakaoLogin';
import '../styles/SignIn.css';
import termsText from '../terms/terms.md';
import '../styles/TermsModal.css';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    apiKey: '',
    username: '',
    rememberMe: false,
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    apiKey: '',
    username: '',
    agreeTerms: ''
  });
  const [toast, setToast] = useState({ message: '', type: '' });
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [termsContent, setTermsContent] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (isSignUp) {
        handleSignUp();
      } else {
        handleSignIn();
      }
    }
  };

  const handleKakaoError = (errorMessage) => {
    console.error('Kakao login error:', errorMessage);
    setToast({ message: errorMessage, type: 'error' });
  };

  const handleKakaoSuccess = async (response) => {
    try {
      const { userData } = response;
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      console.log('Kakao user data:', userData);
      
      let user = users.find(u => u.email === userData.email);

      if (!user) {
        user = {
          email: userData.email,
          username: userData.username,
          provider: 'kakao',
          wishlist: []
        };
        
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        setToast({ message: '카카오 계정으로 회원가입되었습니다!', type: 'success' });
      } else {
        setToast({ message: '카카오 로그인 성공!', type: 'success' });
      }

      localStorage.setItem('loggedInUser', JSON.stringify({
        email: user.email,
        username: user.username,
        provider: 'kakao',
        wishlist: user.wishlist || []
      }));

      localStorage.setItem('rememberMe', JSON.stringify({
        email: user.email,
        timestamp: new Date().getTime()
      }));

      window.location.href = '/';
    } catch (error) {
      handleKakaoError('카카오 로그인 처리 중 오류가 발생했습니다');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignIn = () => {
    // ... 기존 로그인 로직 ...
  };

  const handleSignUp = () => {
    // ... 기존 회원가입 로직 ...
  };

  const handleCardSwitch = () => {
    setIsSignUp((prev) => !prev);
    setErrors({});
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowTermsModal(false);
      setIsClosing(false);
    }, 500);
  };

  useEffect(() => {
    fetch(termsText)
      .then((response) => response.text())
      .then((text) => setTermsContent(text))
      .catch((error) => console.error('이용약관 로딩 오류:', error));
  }, []);

  return (
    <div className="signin-container">
      <div className="card-wrapper">
        <div className={`card-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
          {/* 로그인 카드 */}
          <div className="card front">
            <h2>환영합니다!</h2>
            <br />
            <p>본 서비��는 편리하��� 효율적인 이용을 위해</p>
            <p>개인 TMDB API로 영화 데이터를 불러옵니다.</p>
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="이메일"
            />
            {errors.email && <div className="error">{errors.email}</div>}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="비밀번호"
            />
            {errors.password && <div className="error">{errors.password}</div>}
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>로그인 상태 유지</span>
            </label>
            <button onClick={handleSignIn}>로그인</button>
            <br />
            <span onClick={handleCardSwitch}>계정이 없으신가요? 회원가입</span>
          </div>

          {/* 회원가입 카드 */}
          <div className="card back">
            <h2>계정 생성</h2>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="사용자 이름"
            />
            {errors.username && <div className="error">{errors.username}</div>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="이메일"
            />
            {errors.email && <div className="error">{errors.email}</div>}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="비밀번호"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="비밀번호 확인"
            />
            <input
              type="text"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              placeholder="TMDB API 키"
            />
            <label>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span>약관에 동의합니다</span>
            </label>
            {errors.agreeTerms && <div className="error">{errors.agreeTerms}</div>}
            <term-button onClick={() => setShowTermsModal(true)}>이용약관 보기</term-button>
            <button onClick={handleSignUp}>회원가입</button>
            <br />
            <span onClick={handleCardSwitch}>이미 계정이 있으신가요? 로그인</span>
          </div>
        </div>
        <div className="social-login">
          <KakaoLogin 
            onSuccess={handleKakaoSuccess} 
            onError={handleKakaoError}
          />
        </div>
      </div>
      {showTermsModal && (
        <div className={`terms-modal-overlay ${isClosing ? 'fade-out' : ''}`}>
          <div className={`terms-modal-content ${isClosing ? 'pop-out' : ''}`}>
            <button className="terms-close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <ReactMarkdown className="markdown-content">{termsContent}</ReactMarkdown>
          </div>
        </div>
      )}
      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default SignIn;