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
  putReminders,
} from '../actions/Reminder';
import { putLoadingStatus } from '../actions/AppActions';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const getUuidFromState = (state) => state.userReducer.uuid;
const getItemsFromState = (state) => state.itemReducer.allItems;
const fetchNewReminderKey = () => database.ref('reminders').push().key;

function* addReminderSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const {reminderName, reminderText} = payload;

    const userID = yield select(getUuidFromState);

    const reminderID = yield select(fetchNewReminderKey);

    const newReminder = {
      userID,
      reminderID,
      reminderName,
      reminderText,
    };

    yield call(rsf.database.update, `reminders/${userID}/${reminderID}`, newReminder);

    yield put(putLoadingStatus(false));
    alert('New reminder added successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error adding reminder. ${error}`);
  }
}

function* getAllRemindersSaga({payload}) {
  try {
    yield put(putLoadingStatus(true));
    const userID = yield select(getUuidFromState);

    const data = yield call(rsf.database.read, `reminders/${userID}`);

    const exists = data !== null && data !== undefined;
    if (exists) {
      const itemsArr = Object.values(data);
      
      yield put(putReminders(itemsArr));
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving reminders. ${error}`);
  }
}

function* updateReminderSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { reminderID, reminderName, reminderText } = payload;
    const userID = yield select(getUuidFromState);

    yield call(rsf.database.patch, `reminders/${userID}/${reminderID}`, {
      reminderName, reminderText,
    });

    yield put(putLoadingStatus(false));
    alert('Reminder updated successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error updating reminder. ${error}`);
  }
}

function* deleteReminderSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { reminderID } = payload;

    const userID = yield select(getUuidFromState);

    yield call(rsf.database.delete, `reminders/${userID}/${reminderID}`);

    // const allItems = yield select(getItemsFromState);

    // const updatedItems = allItems.filter((item) => item.itemID === itemID);

    // yield put(putItems(updatedItems));

    yield put(putLoadingStatus(false));
    alert('Reminder deleted successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error deleting reminder. ${error}`);
  }
}

export default function* Reminder() {
  yield all([
    takeLatest(actions.GET.ALL_REMINDERS, getAllRemindersSaga),
    takeLatest(actions.ADD.REMINDER, addReminderSaga),
    takeLatest(actions.UPDATE.REMINDER, updateReminderSaga),
    takeLatest(actions.DELETE.REMINDER, deleteReminderSaga),
    // takeLatest(actions.UPDATE.USER_SITE, updateUserSiteSaga),
  ]);
}
