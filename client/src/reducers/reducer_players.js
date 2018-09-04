import { FETCH_PLAYER, NEW_SEARCH } from '../actions/player';
import _ from 'lodash';

export default function (state={}, action) {
  switch (action.type) {
    case FETCH_PLAYER:
      return action.payload.data;
    case NEW_SEARCH:
      return {};
    default:
      return state;
  }
}