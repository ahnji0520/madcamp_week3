import { LOGIN_SUCCESS, LOGOUT } from '../types/authTypes';

const initialState = {
  u_id: null,
  u_nickname: null,
  isAuthenticated: false,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        u_id: action.payload.u_id,
        u_nickname: action.payload.u_nickname,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        u_id: null,
        u_nickname: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducers;
