import { LOGIN_SUCCESS, LOGOUT } from '../types/authTypes';
import { login, kakaoLogin, register } from '../../api/userApi';
import { SET_FAVORITE_POPUPS } from '../types/favoriteTypes'; // 추가된 import
import { setFavoritePopups } from './favoriteActions'; // 추가된 import

export const loginUser = (u_id, u_password) => async (dispatch) => {
  try {
    const response = await login(u_id, u_password);
    if (response) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          u_id: response.u_id,
          u_nickname: response.u_nickname,
        },
      });
      dispatch(setFavoritePopups(response.p_ids));
    } else {
      console.error('로그인 실패: 유효하지 않은 응답');
    }
  } catch (error) {
    console.error('로그인 실패:', error);
  }
};

export const loginKakaoUser = (u_id, u_nickname) => async (dispatch) => {
  try {
    const response = await kakaoLogin(u_id, u_nickname);
    if (response && response.u_id && response.u_nickname) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          u_id: response.u_id,
          u_nickname: response.u_nickname,
        },
      });
      dispatch(setFavoritePopups(response.p_ids));
    } else {
      console.error('카카오 로그인 실패: 유효하지 않은 응답');
    }
  } catch (error) {
    console.error('카카오 로그인 실패:', error);
  }
};

export const logoutUser = () => ({
  type: LOGOUT,
});

export const registerUser =
  (u_id, u_password, u_nickname) => async (dispatch) => {
    try {
      const response = await register(u_id, u_password, u_nickname);
      if (response && response.u_id && response.u_nickname) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            u_id: response.u_id,
            u_nickname: response.u_nickname,
          },
        });
        dispatch(setFavoritePopups(response.p_ids));
      } else {
        console.error('회원가입 실패: 유효하지 않은 응답', response);
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  };
