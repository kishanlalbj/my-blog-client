import { all } from 'redux-saga/effects';
import watchArticlesSaga from './articles';
import watchLoginSaga from './auth';

export default function* rootSaga() {
  yield all([watchArticlesSaga(), watchLoginSaga()]);
}
