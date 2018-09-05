import axios from 'axios';
import { sortByDesc, sortByAsc } from '../reducers/helpers';

export const FETCH_CLAN = 'fetch_clan';
export const GET_ERRORS = 'get_errors';
export const SET_USER = 'set_user';
export const SORT_TABLE_DESC = 'sort_table_desc';
export const SORT_TABLE_ASC = 'sort_table_asc'
export const ERROR_CLAN = 'clan_error';

const ROOT_URL = "https://clashclantracker.appspot.com";
const API_KEY = "e26539e71e82d0c4564a09b1ff3cd11c";

export const fetchClan = () => dispatch => {
  let error = false;
  const request = axios.get(
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