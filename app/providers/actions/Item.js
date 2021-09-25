export const actions = {
  ADD: {
    ITEM: 'ADD_ITEM'
  },
  GET: {
    ALL_ITEMS: 'GET_ALL_ITEMS',
    ITEM: 'GET_CUPBOARD'
  },
  PUT: {
    ALL_ITEMS: 'PUT_ALL_ITEMS',
    ITEM: 'PUT_ITEM',
    LOADING_STATUS: 'PUT_LOADING_STATUS'
  },
  UPDATE: {
    ITEM: 'UPDATE_ITEM'
  },
  DELETE: {
    ITEM: 'DELETE_ITEM'
  }
};

export const addItem = (cupboardID, itemName, itemCount) => ({
  type: actions.ADD.ITEM,
  payload: { cupboardID, itemName, itemCount },
});

export const updateItem = (cupboardID, itemID, itemName, itemCount) => ({
  type: actions.UPDATE.ITEM,
  payload: { cupboardID,itemID, itemName, itemCount },
});

export const deleteItem = (cupboardID, itemID) => ({
  type: actions.DELETE.ITEM,
  payload: { cupboardID, itemID },
});

export const getItems = (cupboardID) => ({
  type: actions.GET.ALL_ITEMS,
  payload: { cupboardID },
});

export const putItems = (items) => ({
  type: actions.PUT.ALL_ITEMS,
  payload: items,
});

export const putItem = (itemID, itemName, itemCount) => ({
  type: actions.PUT.ITEM,
  payload: {itemID, itemName, itemCount},
});

export const putLoadingStatus = (isLoading) => ({
  type: actions.PUT.LOADING_STATUS,
  isLoading,
});
