export const actions = {
  ADD: {
    CUPBOARD: 'ADD_CUPBOARD'
  },
  GET: {
    ALL_CUPBOARDS: 'GET_ALL_CUPBOARDS_USERS',
    CUPBOARD: 'GET_CUPBOARD'
  },
  PUT: {
    ALL_CUPBOARDS: 'PUT_ALL_CUPBOARDS_USERS',
    CUPBOARD: 'PUT_CUPBOARD',
    LOADING_STATUS: 'PUT_LOADING_STATUS'
  },
  UPDATE: {
    CUPBOARD: 'UPDATE_CUPBOARD'
  },
  DELETE: {
    CUPBOARD: 'DELETE_CUPBOARD'
  }
};

export const addCupboard = (siteID, cupboardName) => ({
  type: actions.ADD.CUPBOARD,
  payload: { siteID, cupboardName },
});

export const updateCupboard = (siteID, cupboardID, cupboardName) => ({
  type: actions.UPDATE.CUPBOARD,
  payload: { siteID, cupboardID, cupboardName },
});

export const deleteCupboard = (siteID, cupboardID) => ({
  type: actions.DELETE.CUPBOARD,
  payload: { siteID, cupboardID },
});

export const getCupboards = (siteID) => ({
  type: actions.GET.ALL_CUPBOARDS,
  payload: { siteID },
});

export const putCupboards = (cupboards) => ({
  type: actions.PUT.ALL_CUPBOARDS,
  payload: cupboards,
});

export const putCupboard = (cupboardID, cupboardName) => ({
  type: actions.PUT.CUPBOARD,
  payload: {cupboardID, cupboardName},
});

export const putLoadingStatus = (isLoading) => ({
  type: actions.PUT.LOADING_STATUS,
  isLoading,
});
