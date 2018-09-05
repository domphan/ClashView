import axios from 'axios';

export const FETCH_PLAYER = 'fetch_player';
export const NEW_SEARCH = 'new_search';
export const ERROR_PLAYER = "player_error";

const ROOT_URL = "https://clashclantracker.appspot.com";

export const fetchPlayer = (tag) => dispatch => {
  const request = axios.get(`${ROOT_URL}/players/${tag}`)
    .then(() => {
      dispatch({
        type: FETCH_PLAYER,
        payload: request
      })
    })
    .catch((error) => {
      dispatch({
        type: ERROR_PLAYER,
        payload: { error: error.response.data }
      });
    });
}

export const newSearch = (player) => {
  return {
    type: NEW_SEARCH,
    payload: player,
  }
}