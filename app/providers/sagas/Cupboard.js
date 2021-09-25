/* eslint-disable no-console */
import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  select,
} from 'redux-saga/effects';
import { navigate, reset } from '../services/NavigatorService';
import rsf, { auth, database, rsf2 } from '../config';
import {
  actions,
  putCupboards,
} from '../actions/Cupboard';
import { putSites } from '../actions/Sites';
import { putLoadingStatus } from '../actions/AppActions';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as ROLES from '../constants/roles';

dayjs.extend(customParseFormat);

const getUuidFromState = (state) => state.userReducer.uuid;
const getCupboardsFromState = (state) => state.cupboardReducer.allCupboards;
const fetchNewCupboardKey = () => database.ref('cupboards').push().key;

function* addCupboardSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const {siteID, cupboardName} = payload;

    const cupboardID = yield select(fetchNewCupboardKey);

    const newCupboard = {
      siteID,
      cupboardID,
      cupboardName,
    };

    yield call(rsf.database.update, `cupboards/${siteID}/${cupboardID}`, newCupboard);

    const allCupboards = yield select(getCupboardsFromState);

    const updatedSites = [...allCupboards, newCupboard];

    yield put(putCupboards(updatedSites));

    yield put(putLoadingStatus(false));
    alert('New cupboard added successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error adding cupboard. ${error}`);
  }
}

function* getAllCupboardsSaga({payload}) {
  try {
    yield put(putLoadingStatus(true));
    const { siteID } = payload;

    const data = yield call(rsf.database.read, `cupboards/${siteID}`);
    const exists = data !== null && data !== undefined;
    if (exists) {
      const cupboardsArr = Object.values(data);

      // const updatedUsersArr = yield all(
      //   usersArr.map(function* (user) {
      //     const siteName = yield call(
      //       rsf.database.read,
      //       `sites/${user.siteID}/siteName`
      //     );

      //     const updatedUser = { ...user, siteName };

      //     return updatedUser;
      //   })
      // );

      // const filterCurrentUserArr = updatedUsersArr.filter(
      //   (user) => user.uuid !== currentUuid
      // );

      yield put(putCupboards(cupboardsArr));
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving cupboards. ${error}`);
  }
}

function* updateCupboardSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { siteID, cupboardID, cupboardName } = payload;

    yield call(rsf.database.patch, `cupboards/${siteID}/${cupboardID}`, {
      cupboardName,
    });

    yield put(putLoadingStatus(false));
    alert('Cupboard updated successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error updating cupboard. ${error}`);
  }
}

function* deleteCupboardSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { siteID, cupboardID } = payload;

    yield call(rsf.database.delete, `cupboards/${siteID}/${cupboardID}`);

    yield put(putLoadingStatus(false));
    alert('Cupboard deleted successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error deleting cupboard. ${error}`);
  }
}

export default function* Cupboard() {
  yield all([
    takeLatest(actions.GET.ALL_CUPBOARDS, getAllCupboardsSaga),
    takeLatest(actions.ADD.CUPBOARD, addCupboardSaga),
    takeLatest(actions.UPDATE.CUPBOARD, updateCupboardSaga),
    takeLatest(actions.DELETE.CUPBOARD, deleteCupboardSaga),
  ]);
}
