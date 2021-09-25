export const actions = {
  REGISTER_USER: 'REGISTER_USER',
  LOGIN: {
    REQUEST: 'LOGIN_REQUEST',
  },
  LOGOUT: {
    REQUEST: 'LOGOUT_REQUEST',
  },
  FORGOT_PASSWORD: {
    REQUEST: 'FORGOT_PASSWORD_REQUEST',
  },
  SYNC_USER: 'SYNC_USER',
  GET: {
    USERS: 'GET_USERS',
  },
  PUT: {
    USER: 'PUT_USER',
    USER_NAME: 'USER_NAME',
    USER_PHONE: 'USER_PHONE',
    USER_PROFILE: 'PUT_USER_PROFILE',
    LOADING_STATUS: 'PUT_LOADING_STATUS',
    ALL_COMMENTS: 'PUT_ALL_COMMENTS',
    LOGOUT_REQUEST: 'PUT_LOGOUT_REQUEST',
    USERS: 'PUT_USERS',
  },
  UPDATE: {
    USER_PROFILE: 'UPDATE_USER_PROFILE',
    USER_SITE: 'UPDATE_USER_SITE',
  },
};

export const registerUser = (name, email, password) => ({
  type: actions.REGISTER_USER,
  payload: { name, email, password },
});

export const updateUserSite = (userObject, siteID) => ({
  type: actions.UPDATE.USER_SITE,
  payload: { userObject, siteID },
});

export const syncUser = () => ({
  type: actions.SYNC_USER,
});

export const forgotPassword = (email, onSuccess) => ({
  type: actions.FORGOT_PASSWORD.REQUEST,
  payload: { email, onSuccess },
});

export const login = ({ email, password }) => ({
  type: actions.LOGIN.REQUEST,
  email,
  password,
});

export const logout = () => ({
  type: actions.LOGOUT.REQUEST,
});

export const putLogout = () => ({
  type: actions.PUT.LOGOUT_REQUEST,
});

export const putUserProfile = (profile) => ({
  type: actions.PUT.USER_PROFILE,
  payload: profile,
});

export const updateUserProfile = (uuid, name, phone, units) => ({
  type: actions.UPDATE.USER_PROFILE,
  payload: { uuid, name, phone, units },
});

export const putUser = (user) => ({
  type: actions.PUT.USER,
  user,
});

export const putUserName = (name) => ({
  type: actions.PUT.USER_NAME,
  payload: name,
});

export const putUserPhone = (phone) => ({
  type: actions.PUT.USER_PHONE,
  payload: phone,
});

export const getUsers = () => ({
  type: actions.GET.USERS,
});

export const putUsers = (users) => ({
  type: actions.PUT.USERS,
  payload: users,
});

export const putLoadingStatus = (isLoading) => ({
  type: actions.PUT.LOADING_STATUS,
  isLoading,
});
