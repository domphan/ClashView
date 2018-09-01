import { SET_USER } from '../actions/index';
import isEmpty from '../is_empty_helper';

const initialState = {
  authenticated: false,
  user: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        authenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }

}