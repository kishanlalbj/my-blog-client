import {
  DELETE_COMMENT_REQUESTED,
  GET_ALL_ARTICLES_REQUESTED,
  GET_ARTICLE_BY_ID_REQUESTED,
  LOGIN_REQUESTED,
  LOGOUT_REQUESTED,
  POST_COMMENT_REQUESTED,
  SAVE_NEW_ARTICLE_REQUESTED,
  SET_USER
} from './types';

export const getAllArticles = (page, limit, search) => ({
  type: GET_ALL_ARTICLES_REQUESTED,
  payload: { page, limit, search }
});

export const saveNewArticle = (article) => ({
  type: SAVE_NEW_ARTICLE_REQUESTED,
  payload: article
});

export const getArticleById = (id) => ({
  type: GET_ARTICLE_BY_ID_REQUESTED,
  payload: id
});

export const loginUser = (tokenId) => ({
  type: LOGIN_REQUESTED,
  payload: tokenId
});

export const logoutUser = (user) => ({
  type: LOGOUT_REQUESTED,
  payload: user
});

export const setCurrentUser = (user, isAuth) => ({
  type: SET_USER,
  user: user,
  isAuth: isAuth
});

export const postComment = (articleId, comment) => ({
  type: POST_COMMENT_REQUESTED,
  articleId,
  comment
});

export const deleteComment = (articleId, commentId) => ({
  type: DELETE_COMMENT_REQUESTED,
  articleId,
  commentId
});
