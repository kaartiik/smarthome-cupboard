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
  putItems,
} from '../actions/Item';
import { putLoadingStatus } from '../actions/AppActions';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const getUuidFromState = (state) => state.userReducer.uuid;
const getItemsFromState = (state) => state.itemReducer.allItems;
const fetchNewItemKey = () => database.ref('items').push().key;

function* addItemSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const {cupboardID, itemName, itemCount} = payload;

    const itemID = yield select(fetchNewItemKey);

    const newItem = {
      cupboardID,
      itemID,
      itemName,
      itemCount,
    };

    yield call(rsf.database.update, `items/${cupboardID}/${itemID}`, newItem);

    const allItems = yield select(getItemsFromState);

    const updatedItems= [...allItems, newItem];

    yield put(putItems(updatedItems));

    yield put(putLoadingStatus(false));
    alert('New item added successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error adding item. ${error}`);
  }
}

function* getAllItemsSaga({payload}) {
  try {
    yield put(putLoadingStatus(true));
    const { cupboardID } = payload;

    console.log('cupboardID', cupboardID);

    const data = yield call(rsf.database.read, `items/${cupboardID}`);

    const exists = data !== null && data !== undefined;
    if (exists) {
      const itemsArr = Object.values(data);
      console.log('itemsarr', itemsArr);
      yield put(putItems(itemsArr));
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving items. ${error}`);
  }
}

function* updateItemSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { cupboardID, itemID, itemName, itemCount } = payload;

    yield call(rsf.database.patch, `items/${cupboardID}/${itemID}`, {
      itemName, itemCount,
    });

    const allItems = yield select(getItemsFromState);

    const itemIndex = allItems.findIndex((item) => item.itemID === itemID);

    allItems[itemIndex] = {
      cupboardID, itemID, itemName, itemCount
    };

    yield put(putItems(allItems));

    yield put(putLoadingStatus(false));
    alert('Item updated successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error updating item. ${error}`);
  }
}

function* deleteItemSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { cupboardID, itemID } = payload;

    yield call(rsf.database.delete, `items/${cupboardID}/${itemID}`);

    const allItems = yield select(getItemsFromState);

    const updatedItems = allItems.filter((item) => item.itemID === itemID);

    yield put(putItems(updatedItems));

    yield put(putLoadingStatus(false));
    alert('Item deleted successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error deleted item. ${error}`);
  }
}

export default function* Item() {
  yield all([
    takeLatest(actions.GET.ALL_ITEMS, getAllItemsSaga),
    takeLatest(actions.ADD.ITEM, addItemSaga),
    takeLatest(actions.UPDATE.ITEM, updateItemSaga),
    takeLatest(actions.DELETE.ITEM, deleteItemSaga),
    // takeLatest(actions.UPDATE.USER_SITE, updateUserSiteSaga),
  ]);
}
