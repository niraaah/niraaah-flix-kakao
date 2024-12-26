import React, { useEffect } from 'react';

const KakaoLogin = ({ onSuccess, onError }) => {
  useEffect(() => {
    const loadKakaoSDK = () => {
      if (window.Kakao) {
        const kakaoKey = process.env.REACT_APP_KAKAO_CLIENT_ID;
        
        if (!window.Kakao.isInitialized()) {
          try {
            window.Kakao.init(kakaoKey);
            console.log('Kakao SDK initialized with key:', kakaoKey);
          } catch (error) {
            console.error('Failed to initialize Kakao SDK:', error);
            onError('카카오 로그인 초기화 실패');
          }
        }
      }
    };

    loadKakaoSDK();
  }, [onError]);

  const handleLogin = () => {
    if (!window.Kakao?.isInitialized()) {
      onError('카카오 로그인을 사용할 수 없습니다');
      return;
    }

    try {
      window.Kakao.Auth.login({
        success: (authObj) => {
          console.log('Kakao auth success');
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (res) => {
              console.log('Kakao user info:', res);
              const userData = {
                email: res.kakao_account?.email || `kakao_${res.id}@kakao.com`,
                username: res.properties?.nickname || '카카오 사용자',
                provider: 'kakao'
              };
              onSuccess({ ...authObj, userData });
            },
            fail: (error) => {
              console.error('Failed to get user info:', error);
              onError('사용자 정보를 가져오는데 실패했습니다');
            }
          });
        },
        fail: (error) => {
          console.error('Login failed:', error);
          onError('카카오 로그인에 실패했습니다');
        }
      });
    } catch (error) {
      console.error('Kakao login error:', error);
      onError('카카오 로그인 중 오류가 발생했습니다');
    }
  };

  return (
    <button 
      className="kakao-login-btn" 
      onClick={handleLogin}
    >
      카카오로 시작하기
    </button>
  );
};

export default KakaoLogin; 