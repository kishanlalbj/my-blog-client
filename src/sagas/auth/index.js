import { put, all, call, takeLatest } from 'redux-saga/effects';
import {} from '../../actions';
import {
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS
} from '../../actions/types';
import { loginUserApi } from '../../api';

function* loginUserSaga(action) {
  try {
    const user = yield call(loginUserApi, action.payload);
    yield put({
      type: LOGIN_SUCCESS,
      user
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      error: error.message
    });
  }
}

function* watchLoginSaga() {
  yield all([takeLatest(LOGIN_REQUESTED, loginUserSaga)]);
}

export default watchLoginSaga;
