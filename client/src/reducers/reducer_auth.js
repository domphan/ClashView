import { SET_USER } from '../actions/index';
import isEmpty from '../is_empty_helper';
import { SET_KEY, ERROR_KEY } from '../actions/auth';

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
    case SET_KEY:
      let newState = {
        ...state
      }
      newState.user.api_key = action.payload.data.api_key;
      return newState;
    case ERROR_KEY:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}