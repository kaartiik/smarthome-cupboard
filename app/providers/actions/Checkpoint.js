export const actions = {
  GET: {
    CLOCKINS: 'GET_CLOCKINS',
    RECORDER_CLOCKINS: 'GET_RECORDER_CLOCKINS',
    CLOCKINS_SITENAMES: 'GET_CLOCKINS_SITENAMES',
    RECORDER_CLOCKINS_SITENAMES: 'GET_RECORDER_CLOCKINS_SITENAMES',
    REFRESHED_CLOCKINS: 'GET_REFRESHED_CLOCKINS',
  },
  PUT: {
    CLOCKINS: 'PUT_CLOCKINS',
    CLOCKINS_RAWDATA: 'PUT_CLOCKINS_RAWDATA',
    CLOCKINS_SITENAMES: 'PUT_CLOCKINS_SITENAMES',
    REFRESHED_CLOCKINS: 'PUT_REFRESHED_CLOCKINS',
    LOADING_STATUS: 'PUT_LOADING_STATUS',
  },
  UPLOAD: {
    CLOCKINS: 'UPLOAD_CLOCKINS',
  },
};

export const uploadClockin = (
  timestamp,
  time,
  altitude,
  location,
  scannedData
) => ({
  type: actions.UPLOAD.CLOCKINS,
  payload: { timestamp, time, altitude, location, scannedData },
});

export const getClockins = (siteID) => ({
  type: actions.GET.CLOCKINS,
  payload: siteID,
});

export const getRecorderClockins = (siteID) => ({
  type: actions.GET.RECORDER_CLOCKINS,
  payload: siteID,
});

export const getClockinSiteNames = () => ({
  type: actions.GET.CLOCKINS_SITENAMES,
});

export const getRecorderClockinSiteNames = () => ({
  type: actions.GET.RECORDER_CLOCKINS_SITENAMES,
});

export const getRefreshedClockins = () => ({
  type: actions.GET.REFRESHED_CLOCKINS,
});

export const putClockins = (clockins) => ({
  type: actions.PUT.CLOCKINS,
  payload: clockins,
});

export const putClockinsRawData = (clockins) => ({
  type: actions.PUT.CLOCKINS_RAWDATA,
  payload: clockins,
});

export const putClockinsSiteName = (clockins) => ({
  type: actions.PUT.CLOCKINS_SITENAMES,
  payload: clockins,
});

export const putRefreshedClockins = (clockins) => ({
  type: actions.PUT.REFRESHED_CLOCKINS,
  payload: clockins,
});

export const putLoadingStatus = (isLoading) => ({
  type: actions.PUT.LOADING_STATUS,
  isLoading,
});
