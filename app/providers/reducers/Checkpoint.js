import { actions } from '../actions/Checkpoint';

const initialState = {
  clockIns: [],
  recipeFeed: [],
  breakfastRecipes: [],
  lunchRecipes: [],
  dinnerRecipes: [],
  recipePhotos: [],
  isLoading: false,
};

export default function checkpointReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.CLOCKINS:
      return {
        ...state,
        clockIns: action.payload,
      };

    case actions.PUT.BREAKFAST_RECIPES:
      return {
        ...state,
        breakfastRecipes: action.payload,
      };

    case actions.PUT.LUNCH_RECIPES:
      return {
        ...state,
        lunchRecipes: action.payload,
      };

    case actions.PUT.DINNER_RECIPES:
      return {
        ...state,
        dinnerRecipes: action.payload,
      };

    case actions.PUT.RECIPE_PHOTOS:
      return {
        ...state,
        recipePhotos: action.payload,
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
