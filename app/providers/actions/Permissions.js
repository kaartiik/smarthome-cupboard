export const actions = {
  GET_PERMISSIONS: 'GET_PERMISSIONS',
  GET: {
    LOCATION_PERMISSION: 'GET_LOCATION_PERMISSION',
  },
  PUT: {
    LOCATION_PERMISSION: 'PUT_LOCATION_PERMISSION',
    CAMERA_PERMISSION: 'PUT_CAMERA_PERMISSION',
    CAMERA_ROLL_PERMISSION: 'PUT_CAMERA_ROLL_PERMISSION',
  },
};

export const getPermissions = () => ({
  type: actions.GET_PERMISSIONS,
});

export const getLocationPermission = () => ({
  type: actions.GET.LOCATION_PERMISSION,
});

export const putLocationPermission = (permission) => ({
  type: actions.PUT.LOCATION_PERMISSION,
  payload: permission,
});

export const putCameraPermission = (permission) => ({
  type: actions.PUT.CAMERA_PERMISSION,
  payload: permission,
});

export const putCameraRollPermission = (permission) => ({
  type: actions.PUT.CAMERA_ROLL_PERMISSION,
  payload: permission,
});
