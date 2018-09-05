import { FETCH_PLAYER, NEW_SEARCH, ERROR_PLAYER } from '../actions/player';
import _ from 'lodash';

export default function (state={}, action) {
  switch (action.type) {
    case FETCH_PLAYER:
      return {...action.payload.data};
    case NEW_SEARCH:
      return {};
    case ERROR_PLAYER:
    console.log("from reducer");
    console.log(action.payload);
      return {...action.payload};
    default:
      return state;
  }
}