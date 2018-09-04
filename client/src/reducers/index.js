import { combineReducers } from 'redux';
import ClansReducer from './reducer_clans';
import ErrorsReducer from './reducer_errors';
import AuthReducer from './reducer_auth';
import PlayerReducer from './reducer_players';

const rootReducer = combineReducers({
  clan: ClansReducer,
  errors: ErrorsReducer,
  auth: AuthReducer,
  player: PlayerReducer
});

export default rootReducer;
