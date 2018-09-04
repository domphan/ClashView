import axios from 'axios';

export const FETCH_PLAYER = 'fetch_player';
export const NEW_SEARCH = 'new_search';

const ROOT_URL = "https://clashclantracker.appspot.com";

export const fetchPlayer = (tag) => {
  const request = axios.get(`${ROOT_URL}/players/${tag}`)  
  return {
    type: FETCH_PLAYER,
    payload: request,
  }
}

export const newSearch = (player) => {
  return {
    type: NEW_SEARCH,
    payload: player,
  }
}