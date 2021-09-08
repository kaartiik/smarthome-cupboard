import { combineReducers } from 'redux';
import userReducer from './User';
import checkpointReducer from './Checkpoint';
import permissionsReducer from './Permissions';
import appActionsReducer from './AppActions';
import sitesReducer from './Sites';

export default combineReducers({
  userReducer,
  checkpointReducer,
  permissionsReducer,
  appActionsReducer,
  sitesReducer,
});
