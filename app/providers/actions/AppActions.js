export const actions = {
  PUT: {
    LOADING_STATUS: 'PUT_LOADING_STATUS',
  },
};

export const putLoadingStatus = (isLoading) => ({
  type: actions.PUT.LOADING_STATUS,
  payload: isLoading,
});
