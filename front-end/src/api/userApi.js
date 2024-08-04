import apiClient from './apiClient';

// 일반 로그인
export const login = async (u_id, u_password) => {
  const response = await apiClient.post('/api/user/login', {
    u_id,
    u_password,
  });
  return response.data;
};

// 카카오 로그인
export const kakaoLogin = async (u_id, u_nickname) => {
  const response = await apiClient.post('/api/user/kakaologin', {
    u_id,
    u_nickname,
  });
  return response.data;
};

// 회원가입
export const register = async (u_id, u_password, u_nickname) => {
  const response = await apiClient.post('/api/user/register', {
    u_id,
    u_password,
    u_nickname,
  });
  return response.data;
};
