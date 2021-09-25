import { combineReducers } from 'redux';
import userReducer from './User';
import checkpointReducer from './Checkpoint';
import permissionsReducer from './Permissions';
import appActionsReducer from './AppActions';
import sitesReducer from './Sites';
import cupboardReducer from './Cupboard';
import itemReducer from './Item';
import reminderReducer from './Reminder';

export default combineReducers({
  userReducer,
  checkpointReducer,
  permissionsReducer,
  appActionsReducer,
  sitesReducer,
  cupboardReducer,
  itemReducer,
  reminderReducer
});
