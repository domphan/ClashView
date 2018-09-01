import { FETCH_CLAN } from '../actions';
//import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CLAN:
      return action.payload.data;
    default:
      return state;
  }
}