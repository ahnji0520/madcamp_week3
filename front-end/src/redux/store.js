import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // 명명된 내보내기에서 가져오기
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
