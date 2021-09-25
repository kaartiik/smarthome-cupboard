import { all } from 'redux-saga/effects';
import User from './User';
import AllPermissions from './Permissions';
import Checkpoint from './Checkpoint';
import Sites from './Sites';
import Cupboard from './Cupboard';
import Item from './Item';
import Reminder from './Reminder';


export default function* rootSaga() {
  yield all([User(), Checkpoint(), AllPermissions(), Sites(), Cupboard(), Item(), Reminder()]);
}
