export const actions = {
  ADD: {
    REMINDER: 'ADD_REMINDER'
  },
  GET: {
    ALL_REMINDERS: 'GET_ALL_REMINDERS_USERS',
    REMINDER: 'GET_REMINDER'
  },
  PUT: {
    ALL_REMINDERS: 'PUT_ALL_REMINDERS_USERS',
    REMINDER: 'PUT_REMINDER',
    LOADING_STATUS: 'PUT_LOADING_STATUS'
  },
  UPDATE: {
    REMINDER: 'UPDATE_REMINDER'
  },
  DELETE: {
    REMINDER: 'DELETE_REMINDER'
  }
};

export const addReminder = (reminderName, reminderText) => ({
  type: actions.ADD.REMINDER,
  payload: { reminderName, reminderText },
});

export const updateReminder = (reminderID, reminderName, reminderText) => ({
  type: actions.UPDATE.REMINDER,
  payload: { reminderID, reminderName, reminderText },
});

export const deleteReminder = ( reminderID) => ({
  type: actions.DELETE.REMINDER,
  payload: { reminderID },
});

export const getReminders = () => ({
  type: actions.GET.ALL_REMINDERS,
});

export const putReminders = (reminders) => ({
  type: actions.PUT.ALL_REMINDERS,
  payload: reminders,
});

export const putReminder = (reminderID, reminderName, reminderText) => ({
  type: actions.PUT.REMINDER,
  payload: {reminderID, reminderName, reminderText},
});

export const putLoadingStatus = (isLoading) => ({
  type: actions.PUT.LOADING_STATUS,
  isLoading,
});
