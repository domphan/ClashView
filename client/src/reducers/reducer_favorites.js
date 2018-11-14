import { FETCH_FAVS, ERROR_FAVS, ADD_FAV, REMOVE_FAV } from '../actions/favorites';
import _ from 'lodash';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_FAVS:
      return {
        ...action.payload.data,
        status: action.payload.status
      };
    case ADD_FAV:
      return {
        "refetch": true
      };
    case REMOVE_FAV:
      return _.omit(state, action.payload.removedPlayer);
    case ERROR_FAVS:
      return {...action.payload};
    default:
      return state;
  }
}