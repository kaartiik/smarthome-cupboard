import { actions } from '../actions/AppActions';

const initialState = {
  isLoading: false,
};

export default function appActionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}
