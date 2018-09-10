import axios from 'axios';
import { sortByDesc, sortByAsc } from '../reducers/helpers';
import jwt_decode from 'jwt-decode';
import { logoutUser } from './auth';

export const FETCH_CLAN = 'fetch_clan';
export const GET_ERRORS = 'get_errors';
export const SET_USER = 'set_user';
export const SORT_TABLE_DESC = 'sort_table_desc';
export const SORT_TABLE_ASC = 'sort_table_asc'
export const ERROR_CLAN = 'clan_error';
export const UPDATE_CLAN = 'update_clan';
export const UPDATING_CLAN = 'updating_clan';

const ROOT_URL = "https://clashclantracker.appspot.com";
const API_KEY = "e26539e71e82d0c4564a09b1ff3cd11c";

export const _checkLogin = () => {
  if (localStorage.jwtToken) {
    const currentTime = Date.now() / 1000;
    const decodedToken = jwt_decode(localStorage.jwtToken);
    if (decodedToken.exp < currentTime) {
      logoutUser([]);
      window.location.href = '/login';
      return false;
    }
  }
  return true;
}

export const fetchClan = () => dispatch => {
  _checkLogin();
  axios.get(
    `${ROOT_URL}/clans`,
    {headers: {
      "auth": API_KEY
    }})
    .then(res => {
      dispatch({
        type: FETCH_CLAN,
        payload: res
      })
    })
    .catch((error) => {
      dispatch({
        type: ERROR_CLAN,
        payload: { error: "cannot fetch clan" },
      })
    })
}

export const updateClan = (clanTag, clan_id) => dispatch => {
  _checkLogin();
  dispatch({ type: UPDATING_CLAN });
  const data = {
    "tag": clanTag,
  }
  axios.put(
    `${ROOT_URL}/clans/${clan_id}`,
    data,
    { headers: { "auth": API_KEY }}
  )
    .then(res => {
      dispatch({
        type: UPDATE_CLAN,
        payload: res
      });
    })
    .catch((error) => {
      dispatch({
        type: ERROR_CLAN,
        payload: { error: "cannot fetch clan "}
      });
    });
}

export const sortTable = (data, key, direction) => {
  let newObj = {...data};
  if (direction) {
    newObj.members = sortByDesc(newObj.members, key);
  } else {
    newObj.members = sortByAsc(newObj.members, key);
  }
  
  return {
    type: SORT_TABLE_DESC,
    payload: newObj,
  }
}