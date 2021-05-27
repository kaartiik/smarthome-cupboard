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
import { actions, putClockins, putLoadingStatus } from '../actions/Checkpoint';

dayjs.extend(customParseFormat);

const fetchNewPostKey = () => database.ref('recipes').push().key;

const fetchRefreshedPosts = () =>
  database
    .ref('posts')
    .once('value')
    .then((snapshot) => ({ postsData: snapshot.val() || {} }));

function* getGeocodeAsync(location) {
  const geocode = yield call(Location.reverseGeocodeAsync, location);
  const address = `${geocode[0].street}, ${geocode[0].city}, ${geocode[0].district}, ${geocode[0].region}`;
  return address;
}

function* uploadClockinSaga({ payload }) {
  yield put(putLoadingStatus(true));
  try {
    console.log('start saga');
    const { timestamp, time, altitude, location, scannedData } = payload;
    const address = yield call(getGeocodeAsync, {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    const clockInObj = {
      clocked_in_at: `${scannedData}: ${time}`,
      recorder: 'Michael',
      checkpoint: scannedData,
      timestamp,
      altitude,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      address,
    };
    yield call(
      rsf.database.update,
      `site_1/clock_ins/${timestamp}`,
      clockInObj
    );
    console.log('finish saga');
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error uploading clock in. ${error}`);
  }
}

function* getClockinsSaga() {
  yield put(putLoadingStatus(true));
  try {
    const data = yield call(rsf.database.read, 'site_1/clock_ins');
    const exists = data !== null && data !== undefined;
    if (exists) {
      const clockInsArr = Object.values(data);
      yield put(putClockins(clockInsArr));
      yield put(putLoadingStatus(false));
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving clock ins. ${error}`);
  }
}

function* getRefreshedPostsSaga() {
  yield put(putLoadingStatus(true));
  try {
    const { postsData } = yield call(fetchRefreshedPosts);
    const exists = postsData !== null;
    if (exists) {
      const postsUnformattedArr = Object.values(postsData);

      const postsArr = yield all(
        postsUnformattedArr.map(function* (data) {
          const {
            userData: { name, avatar },
          } = yield call(getPostUserDetails, data.user_uid);
          const postObject = yield call(formatPost, { data, name, avatar });
          return postObject;
        })
      );
      yield put(putPosts(postsArr));
      yield put(putLoadingStatus(false));
    }
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving new posts! ${error}`);
  }
}

export default function* Checkpoint() {
  yield all([
    takeLatest(actions.UPLOAD.CLOCKINS, uploadClockinSaga),
    takeLatest(actions.GET.CLOCKINS, getClockinsSaga),
  ]);
}
