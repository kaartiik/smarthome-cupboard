export const actions = {
  GET: {
    SITES: 'GET_SITES',
  },
  PUT: {
    SITES: 'PUT_SITES',
  },
  ADD: {
    SITE: 'ADD_SITE',
  },
  UPDATE: {
    SITE: 'UPDATE_SITE',
  },
  DELETE: {
    SITE: 'DELETE_SITE',
  },
};

export const getSites = () => ({
  type: actions.GET.SITES,
});

export const putSites = (sites) => ({
  type: actions.PUT.SITES,
  payload: sites,
});

export const addSite = (siteName) => ({
  type: actions.ADD.SITE,
  payload: siteName,
});

export const updateSite = (siteID, siteName) => ({
  type: actions.UPDATE.SITE,
  payload: { siteID, siteName },
});

export const deleteSite = (siteID) => ({
  type: actions.DELETE.SITE,
  payload: siteID,
});
