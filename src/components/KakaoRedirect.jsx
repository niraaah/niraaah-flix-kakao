import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processKakaoLogin = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        
        if (loggedInUser) {
          console.log('User already logged in, redirecting to home');
          window.location.href = 'https://niraaah.github.io/niraaah-flix-kakao/#/home';
          return;
        }

        if (!window.Kakao?.isInitialized()) {
          window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID);
        }

        // 사용자 정보 요청
        const userInfo = await window.Kakao.API.request({
          url: '/v2/user/me'
        });

        console.log('Kakao user info:', userInfo);

        // 로그인 정보 저장
        const userData = {
          email: userInfo.kakao_account?.email || `kakao_${userInfo.id}@kakao.com`,
          username: userInfo.properties?.nickname || '카카오 사용자',
          provider: 'kakao',
          wishlist: [],
          apiKey: process.env.REACT_APP_TMDB_API_KEY
        };

        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        localStorage.setItem('rememberMe', JSON.stringify({
          email: userData.email,
          timestamp: new Date().getTime()
        }));

        // 정확한 URL로 리다이렉트
        window.location.href = 'https://niraaah.github.io/niraaah-flix-kakao/#/home';
      } catch (error) {
        console.error('Kakao redirect error:', error);
        window.location.href = 'https://niraaah.github.io/niraaah-flix-kakao/#/signin';
      }
    };

    processKakaoLogin();
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoRedirect; 