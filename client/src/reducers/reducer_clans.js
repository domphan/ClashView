import { FETCH_CLAN, SORT_TABLE } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CLAN:
      return action.payload.data;
    case SORT_TABLE:
      return action.payload;
    default:
      return state;
  }
}