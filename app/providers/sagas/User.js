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
import rsf, { auth, database, rsf2 } from '../../providers/config';
import {
  actions,
  putUserProfile,
  putAllComments,
  putUsers,
  putLogout,
} from '../actions/User';
import { putLoadingStatus } from '../actions/AppActions';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as ROLES from '../constants/roles';

dayjs.extend(customParseFormat);

const getUuidFromState = (state) => state.userReducer.uuid;

const getUsersFromState = (state) => state.userReducer.allUsers;

const loginRequest = ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password);

const logoutRequest = () => auth.signOut();

const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

const getUserProfile = (uid) =>
  database
    .ref('users')
    .child(uid)
    .once('value')
    .then((snapshot) => ({ dbUser: snapshot.val() }))
    .catch((error) => ({ error }));

function* syncUserSaga() {
  try {
    yield put(putLoadingStatus(true));

    const user = yield call(onAuthStateChanged);

    if (user) {
      const { dbUser } = yield call(getUserProfile, user.uid);

      if (dbUser !== null && dbUser !== undefined) {
        const siteName = yield call(
          rsf.database.read,
          `sites/${dbUser.siteID}/siteName`
        );

        yield put(putUserProfile({ ...dbUser, siteName }));

        setTimeout(() => {
          reset('AppStack');
        }, 100);

        yield put(putLoadingStatus(false));
      } else {
        setTimeout(() => {
          reset('AuthStack');
        }, 100);

        yield put(putLoadingStatus(false));
      }
    } else {
      setTimeout(() => {
        reset('AuthStack');
      }, 100);

      yield put(putLoadingStatus(false));
    }
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(error);
    return;
  }
}

function* loginSaga({ email, password }) {
  try {
    yield put(putLoadingStatus(true));
    yield call(loginRequest, { email, password });
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(error);
    return;
  }
  yield call(syncUserSaga);
}

function* forgotPasswordSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { email, onSuccess } = payload;
    yield call(rsf.auth.sendPasswordResetEmail, email);
    onSuccess();
    yield put(putLoadingStatus(false));
    alert('Password reset email successfully sent. Please check your email.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Password reset fail. Please try again later. ${error}`);
    return;
  }
  yield call(syncUserSaga);
}

function* getAllUsersSaga() {
  try {
    yield put(putLoadingStatus(true));

    const currentUuid = yield select(getUuidFromState);

    const data = yield call(rsf.database.read, 'users');
    const exists = data !== null && data !== undefined;
    if (exists) {
      const usersArr = Object.values(data);

      const updatedUsersArr = yield all(
        usersArr.map(function* (user) {
          const siteName = yield call(
            rsf.database.read,
            `sites/${user.siteID}/siteName`
          );

          const updatedUser = { ...user, siteName };

          return updatedUser;
        })
      );

      const filterCurrentUserArr = updatedUsersArr.filter(
        (user) => user.uuid !== currentUuid
      );

      yield put(putUsers(filterCurrentUserArr));
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving users. ${error}`);
  }
}

function* createUserSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { name, siteID, email, password } = payload;
    const user = yield call(
      rsf.auth.createUserWithEmailAndPassword,
      email,
      password
    );

    const newUser = {
      name,
      email,
      siteID,
      role: ROLES.RECORDER,
      uuid: user.user.uid,
    };

    yield call(rsf2.database.update, `users/${user.user.uid}`, newUser);

    yield call(rsf2.auth.signOut);

    yield put(putLoadingStatus(false));

    alert('User created successfully!');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Failed to create new user. ${error}`);
    return;
  }
}

function* updateUserSiteSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { userObject, siteID } = payload;

    const { uuid, email, name } = userObject;

    yield call(rsf.database.patch, `users/${uuid}`, {
      siteID,
    });

    const newUserObject = {
      uuid,
      email,
      name,
      siteID,
    };

    const allUsers = yield select(getUsersFromState);

    const itemIndex = allUsers.findIndex((item) => item.uuid === uuid);

    allUsers[itemIndex] = newUserObject;

    yield put(putUsers(allUsers));

    yield put(putLoadingStatus(false));
    alert('User updated successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error updating user. ${error}`);
  }
}

function* logoutSaga() {
  try {
    yield put(putLoadingStatus(true));
    yield put(putLogout());
    yield call(logoutRequest);
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Failed to logout. ${error}`);
    return;
  }
  yield call(syncUserSaga);
}

function* fetchAllCommentsSaga() {
  yield putLoadingStatus(true);
  try {
    const data = yield call(rsf.database.read, `comments`);
    const exists = data !== null && data !== undefined;
    if (exists) {
      const commentsArr = Object.values(data);
      yield put(putAllComments(commentsArr));
      yield put(putLoadingStatus(false));
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    alert(`Failed to retrieve comments. ${error}`);
  }
}

export default function* User() {
  yield all([
    takeLatest(actions.LOGIN.REQUEST, loginSaga),
    takeLatest(actions.FORGOT_PASSWORD.REQUEST, forgotPasswordSaga),
    takeLatest(actions.CREATE_USER, createUserSaga),
    takeLatest(actions.LOGOUT.REQUEST, logoutSaga),
    takeEvery(actions.SYNC_USER, syncUserSaga),
    takeLatest(actions.GET.USERS, getAllUsersSaga),
    takeLatest(actions.UPDATE.USER_SITE, updateUserSiteSaga),
  ]);
}
