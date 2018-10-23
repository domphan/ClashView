import { FETCH_FAVS, ERROR_FAVS } from '../actions/favorites';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_FAVS:
      return {...action.payload.data};
    case ERROR_FAVS:
      return {...action.payload};
    default:
    return state;
  }
}