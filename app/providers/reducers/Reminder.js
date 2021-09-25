import { actions } from '../actions/Reminder';
import * as ROLES from '../constants/roles';

const initialState = {
  reminderName: '',
  reminderText: '',
  reminderID: '',
  allReminders: [],
  isLoading: false,
};

export default function reminderReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.REMINDER: {
      const { reminderID, reminderName } = action.payload;
      return {
        ...state,
        reminderID,
        reminderName,
        reminderText
      };
    }

    case actions.PUT.ALL_REMINDERS:
      return {
        ...state,
        allReminders: action.payload,
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
