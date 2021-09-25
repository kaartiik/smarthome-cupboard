import { actions } from '../actions/Cupboard';
import * as ROLES from '../constants/roles';

const initialState = {
  cupboardName: '',
  cupboardID: '',
  isSuccess: false,
  allCupboards: [],
  isLoading: false,
};

export default function cupboardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.CUPBOARD: {
      const { cupboardID, cupboardName } = action.payload;
      return {
        ...state,
        cupboardName,
        cupboardID,
      };
    }

    case actions.PUT.ALL_CUPBOARDS:
      return {
        ...state,
        allCupboards: action.payload,
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
