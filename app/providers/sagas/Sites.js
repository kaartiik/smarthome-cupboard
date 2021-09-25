/* eslint-disable no-alert */
/* eslint-disable no-console */
import { put, all, call, takeLatest, select } from 'redux-saga/effects';
import rsf, { database } from '../config';
import { actions, putSites } from '../actions/Sites';
import { putLoadingStatus } from '../actions/AppActions';


const getUuidFromState = (state) => state.userReducer.uuid;

const getSitesFromState = (state) => state.sitesReducer.allSites;

const fetchNewSiteKey = () => database.ref('sites').push().key;

function* getAllSitesSaga() {
  try {
    yield put(putLoadingStatus(true));

    const uuid = yield select(getUuidFromState);

    const data = yield call(rsf.database.read, `sites/${uuid}`);
    const exists = data !== null && data !== undefined;
    // let sitesArr = [];
    if (exists) {
      const sitesArr = Object.values(data);
      // const sitesObject = initialSitesArr[0];

      // for(const i in sitesObject) {
      //   sitesArr.push(sitesObject[i]);
      // }
      
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

    const uuid = yield select(getUuidFromState);

    const siteID = yield select(fetchNewSiteKey);

    const newSite = {
      siteID,
      siteName,
    };

    yield call(rsf.database.update, `sites/${uuid}/${siteID}`, newSite);

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

    const uuid = yield select(getUuidFromState);

    yield call(rsf.database.patch, `sites/${uuid}/${siteID}`, {
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

    const uuid = yield select(getUuidFromState);

    yield call(rsf.database.delete, `sites/${uuid}/${siteID}`);

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
