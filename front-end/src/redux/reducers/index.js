import { combineReducers } from 'redux';
import authReducers from './authReducers';
import favoriteReducers from './favoriteReducers';

const rootReducer = combineReducers({
  auth: authReducers,
  favoritePopups: favoriteReducers,
  // 다른 리듀서 추가 가능
});

export default rootReducer;
