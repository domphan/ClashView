import { FETCH_CLAN, SORT_TABLE_DESC, SORT_TABLE_ASC } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CLAN:
      return action.payload.data;
    case SORT_TABLE_DESC:
      return action.payload;
    case SORT_TABLE_ASC:
      return action.payload;
    default:
      return state;
  }
}