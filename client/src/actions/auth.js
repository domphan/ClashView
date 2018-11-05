import axios from 'axios';
import { GET_ERRORS, SET_USER, _checkLogin } from '.';
import setAuthToken from '../auth_token';
import jwt_decode from 'jwt-decode';
import { fetchFavorites } from './favorites';

export const SET_KEY = 'set_key';
export const ERROR_KEY = 'error_key';

export const signupUser = (user, history) => dispatch => {
  axios.post('/api/users/signup', user)
    .then(res => history.push('/login'))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
}

export const loginUser = (user) => dispatch => {
  axios.post('/api/users/login', user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decodedToken = jwt_decode(token);
      dispatch(setCurrentUser(decodedToken));
      dispatch(fetchFavorites(decodedToken.api_key))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
}

export const setCurrentUser = (decodedToken) => {
  return {
    type: SET_USER,
    payload: decodedToken,
  }
}

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/login');
}

export const assignKey = (user) => dispatch => {
  if (!_checkLogin()) {
    return;
  }
  axios.post('/api/users/api_key', user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decodedToken = jwt_decode(token);
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err => {
      dispatch({
        type: ERROR_KEY,
        payload: err.response.data
      });
    });
}