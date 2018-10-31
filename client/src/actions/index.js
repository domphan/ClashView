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
export const NEW_CLAN = 'new_clan';

const ROOT_URL = "https://clashclantracker.appspot.com";

export const _checkLogin = () => {
  if (localStorage.jwtToken) {
    const currentTime = Date.now() / 1000;
    const decodedToken = jwt_decode(localStorage.jwtToken);
    if (decodedToken.exp < currentTime) {
      logoutUser([]);
      window.location.href = '/login';
      return false;
    }
    return true;
  }
  return false;
}

export const fetchClan = (api_key) => dispatch => {
  if (!_checkLogin()) {
    return;
  }
  axios.get(
    `${ROOT_URL}/clans`,
    {headers: {
      "auth": api_key
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

export const updateClan = (clanTag, clan_id, api_key) => dispatch => {
  if (!_checkLogin()) {
    return;
  }
  dispatch({ type: UPDATING_CLAN });
  const data = {
    "tag": clanTag,
  }
  axios.put(
    `${ROOT_URL}/clans/${clan_id}`,
    data,
    { headers: { "auth": api_key }}
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

export const addClan = (clanTag, api_key) => dispatch => {
  if (clanTag.length < 5) {
    dispatch({
      type: ERROR_CLAN,
      payload: { error: "invalid clan tag" }
    });
  }
  const data = {
    tag: clanTag,
  }
  axios.post(
    `${ROOT_URL}/clans`,
    data,
    { headers: { auth: api_key }})
    .then(res => {
      dispatch({
        type: NEW_CLAN,
        payload: res
      });
    })
    .catch(error => {
      dispatch({
        type: ERROR_CLAN,
        payload: { error: error.response.data }
      })
    })
}