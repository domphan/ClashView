import { FETCH_CLAN, SORT_TABLE_DESC, SORT_TABLE_ASC, ERROR_CLAN, UPDATE_CLAN, UPDATING_CLAN } from '../actions';
export default function(state = {}, action) {
  switch (action.type) {
    // Reduces clan data to view
    case FETCH_CLAN:
      return {...action.payload.data};
    // fired off to let the user know their data is processing
    case UPDATING_CLAN:
      return {
        ...state,
        inProgress: true,
      };
    // HTTP request returned, so we can update everything and turn off loading
    case UPDATE_CLAN:
      return {
        ...state,
        inProgress: false,
        ...action.payload.data
      };
    // table sorting
    case SORT_TABLE_DESC:
      return action.payload;
    case SORT_TABLE_ASC:
      return action.payload;
    // basic error handling
    case ERROR_CLAN:
      return {...action.payload};
    default:
      return state;
  }
}