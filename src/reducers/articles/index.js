import {
  GET_ALL_ARTICLES_FAIL,
  GET_ALL_ARTICLES_REQUESTED,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ARTICLE_BY_ID_FAIL,
  GET_ARTICLE_BY_ID_REQUESTED,
  GET_ARTICLE_BY_ID_SUCCESS,
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUESTED,
  POST_COMMENT_SUCCESS,
  SAVE_NEW_ARTICLE_REQUESTED,
  SAVE_NEW_ARTICLE_REQUESTED_FAIL,
  SAVE_NEW_ARTICLE_REQUESTED_SUCCESS
} from '../../actions/types';

const INITIAL_STATE = {
  articles: [],
  loading: false,
  error: null,
  page: 1,
  limit: 4,
  next: null,
  previous: null,
  article: {},
  commentLoading: true
};

const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLES_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ALL_ARTICLES_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        articles: [...action.articles],
        next: action.next,
        previous: action.previous
      };
    case GET_ALL_ARTICLES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case GET_ARTICLE_BY_ID_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ARTICLE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        article: action.article
      };
    case GET_ARTICLE_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SAVE_NEW_ARTICLE_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_NEW_ARTICLE_REQUESTED_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SAVE_NEW_ARTICLE_REQUESTED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case POST_COMMENT_REQUESTED:
      return {
        ...state,
        commentLoading: true
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        article: action.article
      };
    case POST_COMMENT_FAIL:
      return {
        ...state,
        commentLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default articlesReducer;
