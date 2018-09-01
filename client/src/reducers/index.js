import { combineReducers } from 'redux';
import ClansReducer from './reducer_clans';
import ErrorsReducer from './reducer_errors';

const rootReducer = combineReducers({
  clan: ClansReducer,
  errors: ErrorsReducer
});

export default rootReducer;
