import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOGIN_FAILED,
  SET_USER
} from '../../actions/types';

const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        isAuthenticated: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case LOGOUT_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: action.isAuth
      };
    default:
      return state;
  }
};

export default authReducer;
