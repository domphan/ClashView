import { combineReducers } from 'redux';
import ClansReducer from './reducer_clans';
import ErrorsReducer from './reducer_errors';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  clan: ClansReducer,
  errors: ErrorsReducer,
  auth: AuthReducer,
});

export default rootReducer;
