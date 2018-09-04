import axios from 'axios';
import { GET_ERRORS, SET_USER } from '.';
import setAuthToken from '../auth_token';
import jwt_decode from 'jwt-decode';


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