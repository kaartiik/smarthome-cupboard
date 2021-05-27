import { combineReducers } from 'redux';
import userReducer from './User';
import checkpointReducer from './Checkpoint';
import permissionsReducer from './Permissions';

export default combineReducers({
  userReducer,
  checkpointReducer,
  permissionsReducer,
});
