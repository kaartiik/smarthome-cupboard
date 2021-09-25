import { actions } from '../actions/Item';

const initialState = {
  itemName: '',
  itemID: '',
  itemCount: 0,
  allItems: [],
  isLoading: false,
};

export default function itemReducer(state = initialState, action = {}) {
  switch (action.type) {
    // case actions.PUT.SELECTED_CUPBOARD: {
    //   const { cupboardID, cupboardName } = action.payload;
    //   return {
    //     ...state,
    //     cupboardName,
    //     cupboardID,
    //   };
    // }
    case actions.PUT.ITEM:{
      const { itemID, itemName, itemCount } = action.payload;
      return {
        ...state,
        itemName: itemName,
        itemID: itemID,
        itemCount: itemCount,
      };
}
    case actions.PUT.ALL_ITEMS:
      return {
        ...state,
        allItems: action.payload,
      };

    case actions.PUT.LOADING_STATUS:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
}
