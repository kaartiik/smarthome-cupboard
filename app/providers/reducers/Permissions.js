import { actions } from '../actions/Permissions';

const initialState = {
  locationPermission: false,
  cameraPermission: false,
  cameraRollPermission: false,
};

export default function permissionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.LOCATION_PERMISSION:
      return {
        ...state,
        locationPermission: action.payload,
      };

    case actions.PUT.CAMERA_PERMISSION:
      return {
        ...state,
        cameraPermission: action.payload,
      };

    case actions.PUT.CAMERA_ROLL_PERMISSION:
      return {
        ...state,
        cameraRollPermission: action.payload,
      };

    default:
      return state;
  }
}
