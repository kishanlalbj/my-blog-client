import axios from './interceptor';
import jwt_decode from 'jwt-decode';

// const API_URL = 'http://localhost:3001/api';
const API_URL = `${process.env.REACT_APP_API_URL}`;

export const getAllArticlesApi = async (page, limit, search) => {
  return await axios
    .get(`${API_URL}/articles`, {
      params: {
        search,
        page,
        limit
      }
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};

export const saveNewArticleApi = async (article) => {
  return await axios
    .post(`${API_URL}/articles`, { ...article })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};

export const getArticleByIdApi = async (id) => {
  return await axios
    .get(`${API_URL}/articles/${id}`)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};

export const loginUserApi = async (tokenId) => {
  return await axios
    .post(`${API_URL}/auth/google/login`, { tokenId })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      const decoded = jwt_decode(token);

      return decoded;
    })
    .catch((err) => {
      throw err;
    });
};

export const logoutUserApi = async () => {
  return await axios
    .post('/auth/google/logout')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const postCommentApi = async (articleId, comment) => {
  return await axios
    .post('/articles/comment', {
      articleId,
      comment
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const deleteCommentApi = async (articleId, commentId) => {
  return await axios.delete('/articles/comment', {
    articleId,
    commentId
  });
};
