import { put, all, call, takeLatest } from 'redux-saga/effects';
import {
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_FAIL,
  GET_ALL_ARTICLES_REQUESTED,
  GET_ARTICLE_BY_ID_SUCCESS,
  GET_ARTICLE_BY_ID_FAIL,
  GET_ARTICLE_BY_ID_REQUESTED,
  SAVE_NEW_ARTICLE_REQUESTED_SUCCESS,
  SAVE_NEW_ARTICLE_REQUESTED_FAIL,
  SAVE_NEW_ARTICLE_REQUESTED,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUESTED,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_REQUESTED
} from '../../actions/types';
import {
  getAllArticlesApi,
  getArticleByIdApi,
  postCommentApi,
  deleteCommentApi,
  saveNewArticleApi
} from '../../api';

function* getAllArticlesSaga(action) {
  try {
    const result = yield call(
      getAllArticlesApi,
      action.payload.page,
      action.payload.limit,
      action.payload.search
    );
    yield put({
      type: GET_ALL_ARTICLES_SUCCESS,
      articles: result.results,
      previous: result.previous,
      next: result.next
    });
  } catch (error) {
    yield put({ type: GET_ALL_ARTICLES_FAIL, error: error.message });
  }
}

function* getArticleByIdSaga(action) {
  try {
    const article = yield call(getArticleByIdApi, action.payload);
    yield put({ type: GET_ARTICLE_BY_ID_SUCCESS, article: article });
  } catch (error) {
    yield put({ type: GET_ARTICLE_BY_ID_FAIL, error: error.message });
  }
}

function* saveNewArticleSaga(action) {
  try {
    const article = yield call(saveNewArticleApi, action.payload);
    yield put({ type: SAVE_NEW_ARTICLE_REQUESTED_SUCCESS, article: article });
  } catch (error) {
    yield put({ type: SAVE_NEW_ARTICLE_REQUESTED_FAIL, error: error.message });
  }
}

function* postCommentSaga(action) {
  try {
    const article = yield call(
      postCommentApi,
      action.articleId,
      action.comment
    );

    yield put({ type: POST_COMMENT_SUCCESS, article: article });
  } catch (error) {
    yield put({ type: POST_COMMENT_FAIL, error: error.message });
  }
}

function* deleteCommentSaga(action) {
  try {
    const article = yield select((state) => state.articles.article);
    const comment = yield call(
      deleteCommentApi,
      action.payload.articleId,
      action.payload.commentId
    );
    article.comments = article.comments.filter(
      (obj) => obj._id !== comment._id
    );
    yield put({ type: DELETE_COMMENT_SUCCESS, article });
  } catch (error) {}
}

function* watchArticlesSaga() {
  yield all([
    takeLatest(GET_ALL_ARTICLES_REQUESTED, getAllArticlesSaga),
    takeLatest(GET_ARTICLE_BY_ID_REQUESTED, getArticleByIdSaga),
    takeLatest(SAVE_NEW_ARTICLE_REQUESTED, saveNewArticleSaga),
    takeLatest(POST_COMMENT_REQUESTED, postCommentSaga),
    takeLatest(DELETE_COMMENT_REQUESTED, deleteCommentSaga)
  ]);
}

export default watchArticlesSaga;
