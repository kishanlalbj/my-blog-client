import jwt_decode from 'jwt-decode';

export default () => {
  let token = localStorage.getItem('jwtToken');

  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem('jwtToken');

      return {
        isAuth: false,
        user: null
      };
    } else {
      return {
        isAuth: true,
        user: decoded
      };
    }
  } else {
    return {
      isAuth: false,
      user: null
    };
  }
};
