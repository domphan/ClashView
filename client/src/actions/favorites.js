import axios from 'axios';
import { _checkLogin } from './index';

export const FETCH_FAVS = 'fetch_favorite';
export const ADD_FAV = 'add_favorite';
export const REMOVE_FAV = 'remove_favorite';
export const ERROR_FAVS = 'error_favorite';
const ROOT_URL = "https://clashclantracker.appspot.com";

export const fetchFavorites = (api_key) => dispatch => {
  if (!_checkLogin()) {
    return;
  }
  axios.get(
    `${ROOT_URL}/favorites`,
    { 
      headers: { "auth": api_key } 
    })
    .then(res => {
      dispatch({
        type: FETCH_FAVS,
        payload: res
      })
    })
    .catch(error => {
      dispatch({
        type: ERROR_FAVS,
        payload: { error: "cannot fetch favorites" },
      })
    })
}

export const addFavorite = (api_key, tag) => dispatch => {
  if (!_checkLogin()) {
    return;
  }
  const data = {
    player_tag: tag
  }
  axios.post(
    `${ROOT_URL}/favorites`,
    data,
    { headers: { "auth": api_key } })
    .then(res => dispatch({
      type: ADD_FAV,
      payload: res.data.pop()
    }))
    .catch(error => {
      dispatch({
        type: ERROR_FAVS,
        payload: { error: "cannot add to favorites" },
      })
    })
  
}

export const removeFavorite = (api_key, tag) => dispatch => {
  if (!_checkLogin()) {
    return;
  }
  axios.delete(
    `${ROOT_URL}/favorites/${tag}`,
    { headers: { "auth": api_key } })
  .then(res => dispatch({
    type: REMOVE_FAV,
    payload: { removedPlayer: tag }
  }))
  .catch(err => dispatch({
    type: ERROR_FAVS,
    payload: { error: "cannot remove favorite" },
  }))
}