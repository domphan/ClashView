import { FETCH_PLAYER, NEW_SEARCH, ERROR_PLAYER } from '../actions/player';

export default function (state={}, action) {
  switch (action.type) {
    case FETCH_PLAYER:
      return {...action.payload.data};
    case NEW_SEARCH:
      return {};
    case ERROR_PLAYER:
      return {...action.payload};
    default:
      return state;
  }
}