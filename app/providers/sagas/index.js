import { all } from 'redux-saga/effects';
import User from './User';
import AllPermissions from './Permissions';
import Checkpoint from './Checkpoint';
import Sites from './Sites';

export default function* rootSaga() {
  yield all([User(), Checkpoint(), AllPermissions(), Sites()]);
}
