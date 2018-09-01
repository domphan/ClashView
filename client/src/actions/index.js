import axios from 'axios';
export const FETCH_CLAN = 'fetch_clan';
export const GET_ERRORS = 'get_errors';
export const SET_USER = 'set_user';

const ROOT_URL = "https://clashclantracker.appspot.com";
const API_KEY = "e26539e71e82d0c4564a09b1ff3cd11c";

export function fetchClan() {
  const request = axios.get(
    `${ROOT_URL}/clans`,
    {headers: {
      "auth": API_KEY
    }});
  return {
    type: FETCH_CLAN,
    payload: request
  }
}