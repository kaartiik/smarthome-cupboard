import { actions } from '../actions/Checkpoint';

const initialState = {
  clockIns: [],
  clockInRawData: null,
  clockInSiteNames: [],
  isLoading: false,
};

export default function checkpointReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.CLOCKINS:
      return {
        ...state,
        clockIns: action.payload,
      };

    case actions.PUT.CLOCKINS_RAWDATA:
      return {
        ...state,
        clockInRawData: action.payload,
      };

    case actions.PUT.CLOCKINS_SITENAMES:
      return {
        ...state,
        clockInSiteNames: action.payload,
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
