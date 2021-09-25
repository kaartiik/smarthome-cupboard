import { actions } from '../actions/User';
import * as ROLES from '../../providers/constants/roles';

const initialState = {
  name: '',
  email: '',
  uuid: '',
  isSuccess: false,
  allUsers: [],
  isLoading: false,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.USER_PROFILE: {
      const { uuid, name, email } = action.payload;
      return {
        ...state,
        name,
        email,
        uuid,
      };
    }

    case actions.PUT.USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case actions.PUT.LOGOUT_REQUEST:
      return initialState;

    case actions.PUT.LOADING_STATUS:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
}
