import { FETCH_CLAN, SORT_TABLE_DESC, SORT_TABLE_ASC, ERROR_CLAN, UPDATE_CLAN, UPDATING_CLAN } from '../actions';
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CLAN:
      return {...action.payload.data};
    case UPDATING_CLAN:
      return {
        ...state,
        inProgress: true,
      };
    case UPDATE_CLAN:
      return {
        ...state,
        inProgress: false,
        ...action.payload.data
      };
    case SORT_TABLE_DESC:
      return action.payload;
    case SORT_TABLE_ASC:
      return action.payload;
    case ERROR_CLAN:
      return {...action.payload};
    default:
      return state;
  }
}