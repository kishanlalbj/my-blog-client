import { combineReducers } from 'redux';
import articlesReducer from './articles';
import authReducer from './auth';

const rootReducer = combineReducers({
  articles: articlesReducer,
  auth: authReducer
});

export default rootReducer;
