export const actions = {
  GET: {
    CLOCKINS: 'GET_CLOCKINS',
    REFRESHED_CLOCKINS: 'GET_REFRESHED_CLOCKINS',
  },
  PUT: {
    CLOCKINS: 'PUT_CLOCKINS',
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

export const getClockins = () => ({
  type: actions.GET.CLOCKINS,
});

export const getRefreshedClockins = () => ({
  type: actions.GET.REFRESHED_CLOCKINS,
});

export const putClockins = (clockins) => ({
  type: actions.PUT.CLOCKINS,
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
