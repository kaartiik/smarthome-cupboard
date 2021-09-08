/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import {
  call,
  put,
  take,
  select,
  takeLatest,
  all,
  fork,
} from 'redux-saga/effects';
import * as Location from 'expo-location';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import rsf, { database } from '../config';
import {
  actions,
  putClockins,
  putClockinsRawData,
  putClockinsSiteName,
} from '../actions/Checkpoint';
import { putLoadingStatus } from '../actions/AppActions';

dayjs.extend(customParseFormat);

const getClockInRawData = (state) => state.checkpointReducer.clockInRawData;

const getUserSiteID = (state) => state.userReducer.siteID;

const getUserSiteName = (state) => state.userReducer.siteName;

const getUserName = (state) => state.userReducer.name;

function* getGeocodeAsync(location) {
  const geocode = yield call(Location.reverseGeocodeAsync, location);
  const address = `${geocode[0].street}, ${geocode[0].city}, ${geocode[0].district}, ${geocode[0].region}`;
  return address;
}

function* uploadClockinSaga({ payload }) {
  yield put(putLoadingStatus(true));
  try {
    const { timestamp, time, altitude, location, scannedData } = payload;
    const address = yield call(getGeocodeAsync, {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    const userName = yield select(getUserName);
    const siteID = yield select(getUserSiteID);

    const clockInObj = {
      clocked_in_at: `${scannedData}: ${time}`,
      recorder: userName,
      checkpoint: scannedData,
      timestamp,
      altitude,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      address,
      siteID,
    };
    yield call(
      rsf.database.update,
      `clock_ins/${siteID}/${timestamp}`,
      clockInObj
    );

    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error uploading clock in. ${error}`);
  }
}

// function* getClockinsSaga() {
//   yield put(putLoadingStatus(true));
//   try {
//     const data = yield call(rsf.database.read, 'site_1/clock_ins');
//     const exists = data !== null && data !== undefined;
//     if (exists) {
//       const clockInsArr = Object.values(data);
//       yield put(putClockins(clockInsArr));
//       yield put(putLoadingStatus(false));
//     }
//     yield put(putLoadingStatus(false));
//   } catch (error) {
//     yield put(putLoadingStatus(false));
//     alert(`Error retrieving clock ins. ${error}`);
//   }
// }

function* getClockinsSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const siteID = payload;
    const clockInRawData = yield select(getClockInRawData);
    const rawDataExists =
      clockInRawData !== null && clockInRawData !== undefined;
    if (rawDataExists) {
      const data = clockInRawData[siteID];
      const exists = data !== null && data !== undefined;
      if (exists) {
        const clockInsArr = Object.values(data);
        const latestFirstClockInsArr = clockInsArr.sort(
          (a, b) => b.timestamp - a.timestamp
        );
        yield put(putClockins(latestFirstClockInsArr));
      }
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving clock ins. ${error}`);
    return;
  }
}

function* getRecorderClockinsSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const siteID = payload;
    const data = yield call(
      rsf.database.read,
      database.ref('clock_ins').child(siteID).orderByChild('timestamp')
    );
    const exists = data !== null && data !== undefined;
    if (exists) {
      const clockInsArr = Object.values(data);
      const latestFirstClockInsArr = clockInsArr.reverse();
      yield put(putClockins(latestFirstClockInsArr));
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving recorder clock ins. ${error}`);
    return;
  }
}

function* getClockInSitesSaga() {
  try {
    yield put(putLoadingStatus(true));
    const data = yield call(rsf.database.read, 'clock_ins');
    const exists = data !== null && data !== undefined;

    if (exists) {
      yield put(putClockinsRawData(data));
      const clockInSiteIDsArr = Object.keys(data);

      const clockInSiteNamesArr = yield all(
        clockInSiteIDsArr.map(function* (item) {
          const siteData = yield call(rsf.database.read, `sites/${item}`);
          return siteData;
        })
      );

      yield put(putClockinsSiteName(clockInSiteNamesArr));
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving clock in sites. ${error}`);
    return;
  }
}

function* getRecorderClockInSitesSaga() {
  try {
    yield put(putLoadingStatus(true));
    const siteID = yield select(getUserSiteID);
    const siteName = yield select(getUserSiteName);

    const siteObject = {
      siteID,
      siteName,
    };

    yield put(putClockinsSiteName([siteObject]));

    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving clock in sites. ${error}`);
    return;
  }
}

export default function* Checkpoint() {
  yield all([
    takeLatest(actions.UPLOAD.CLOCKINS, uploadClockinSaga),
    takeLatest(actions.GET.CLOCKINS, getClockinsSaga),
    takeLatest(actions.GET.RECORDER_CLOCKINS, getRecorderClockinsSaga),
    takeLatest(actions.GET.CLOCKINS_SITENAMES, getClockInSitesSaga),
    takeLatest(
      actions.GET.RECORDER_CLOCKINS_SITENAMES,
      getRecorderClockInSitesSaga
    ),
  ]);
}
