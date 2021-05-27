/* eslint-disable no-alert */
/* eslint-disable no-console */
import { put, fork, call, takeLatest, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import {
  actions,
  putLocationPermission,
  putCameraPermission,
  putCameraRollPermission,
} from '../actions/Permissions';

const locationAlert = () => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      'Use your location',
      'Patrol Service collects location data only when the app is in use during checkpoint scanning action to enable the location details to be displayed in the checkpoint history.\n\nLocation details ensures that checkpoint scannings are completed on site.',
      [
        { text: 'Cancel', onPress: () => resolve('NO') },
        { text: 'Ok', onPress: () => resolve('YES') },
      ],
      { cancelable: false }
    );
  });
};

function* checkPermissionsSaga() {
  const { status } = yield call(Permissions.getAsync, Permissions.LOCATION);
  const { status: cameraStatus } = yield call(
    Permissions.getAsync,
    Permissions.CAMERA
  );
  const { status: cameraRollStatus } = yield call(
    Permissions.getAsync,
    Permissions.MEDIA_LIBRARY
  );
  const { status: notificationStatus } = yield call(
    Permissions.getAsync,
    Permissions.NOTIFICATIONS
  );

  if (status !== 'granted') {
    const result = yield call(locationAlert);

    if (result === 'YES') {
      const { status: reStatus } = yield call(
        Permissions.askAsync,
        Permissions.LOCATION
      );

      if (reStatus !== 'granted') {
        alert(`We need location permission to make this work`);
      } else {
        yield put(putLocationPermission(true));
      }
    }
  }

  if (cameraStatus !== 'granted') {
    const { status: reStatus } = yield call(
      Permissions.askAsync,
      Permissions.CAMERA
    );

    if (reStatus !== 'granted') {
      alert(
        `Camera Permission\n\nWe need camera permission to make this work.`
      );
    } else {
      yield put(putCameraPermission(true));
    }
  }

  if (cameraRollStatus !== 'granted') {
    const { status: reStatus } = yield call(
      Permissions.askAsync,
      Permissions.MEDIA_LIBRARY
    );

    if (reStatus !== 'granted') {
      alert(
        `Storage Permission\n\nWe need storage permission to make this work.`
      );
    } else {
      yield put(putCameraRollPermission(true));
    }
  }

  if (notificationStatus !== 'granted') {
    const { status: reStatus } = yield call(
      Permissions.askAsync,
      Permissions.NOTIFICATIONS
    );

    if (reStatus !== 'granted') {
      alert(
        `Notification Permission\n\nWe need notification permission to make this work.`
      );
    }
  }
}

export default function* AllPermissions() {
  yield fork(checkPermissionsSaga);
  yield takeLatest(actions.GET_PERMISSIONS, checkPermissionsSaga);
}
