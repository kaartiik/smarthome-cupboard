import { actions } from '../actions/Sites';

const initialState = {
  allSites: [],
};

export default function sitesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.SITES:
      return {
        ...state,
        allSites: action.payload,
      };

    default:
      return state;
  }
}
