/* eslint-disable no-alert */
/* eslint-disable no-console */
import { put, all, call, takeLatest, select } from 'redux-saga/effects';
import rsf, { database } from '../config';
import { actions, putSites } from '../actions/Sites';
import { putLoadingStatus } from '../actions/AppActions';

const getSitesFromState = (state) => state.sitesReducer.allSites;

const fetchNewSiteKey = () => database.ref('sites').push().key;

function* getAllSitesSaga() {
  try {
    yield put(putLoadingStatus(true));

    const data = yield call(rsf.database.read, 'sites');
    const exists = data !== null && data !== undefined;
    if (exists) {
      const sitesArr = Object.values(data);
      yield put(putSites(sitesArr));
    }
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error retrieving sites. ${error}`);
  }
}

function* addSiteSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const siteName = payload;

    const siteID = yield select(fetchNewSiteKey);

    const newSite = {
      siteID,
      siteName,
    };

    yield call(rsf.database.update, `sites/${siteID}`, newSite);

    const allSites = yield select(getSitesFromState);

    const updatedSites = [...allSites, newSite];

    yield put(putSites(updatedSites));

    yield put(putLoadingStatus(false));
    alert('New site added successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error adding site. ${error}`);
  }
}

function* updateSiteSaga({ payload }) {
  try {
    yield put(putLoadingStatus(true));
    const { siteID, siteName } = payload;

    yield call(rsf.database.patch, `sites/${siteID}`, {
      siteName,
    });

    const newSite = {
      siteID,
      siteName,
    };

    const allSites = yield select(getSitesFromState);

    const itemIndex = allSites.findIndex((item) => item.siteID === siteID);

    allSites[itemIndex] = newSite;

    yield put(putSites(allSites));

    yield put(putLoadingStatus(false));
    alert('Site updated successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error updating site. ${error}`);
  }
}

function* deleteSiteSaga({ payload }) {
  try {
    yield put * putLoadingStatus(true);
    const siteID = payload;

    yield call(rsf.database.delete, `sites/${siteID}`);

    const allSites = yield select(getSitesFromState);

    const updatedSites = allSites.filter((item) => item.siteID !== siteID);

    yield put(putSites(updatedSites));

    yield put(putLoadingStatus(false));
    alert('Site deleted successfully.');
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(`Error deleting site. ${error}`);
  }
}

export default function* Sites() {
  yield all([
    takeLatest(actions.GET.SITES, getAllSitesSaga),
    takeLatest(actions.ADD.SITE, addSiteSaga),
    takeLatest(actions.UPDATE.SITE, updateSiteSaga),
    takeLatest(actions.DELETE.SITE, deleteSiteSaga),
  ]);
}
