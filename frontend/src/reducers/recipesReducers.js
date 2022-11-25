import {
  RECIPES_LIST_REQUEST,
  RECIPES_LIST_SUCCESS,
  RECIPES_LIST_FAIL,
  RECIPES_CREATE_REQUEST,
  RECIPES_CREATE_SUCCESS,
  RECIPES_CREATE_FAIL,
  RECIPES_UPDATE_REQUEST,
  RECIPES_UPDATE_SUCCESS,
  RECIPES_UPDATE_FAIL,
} from "../constants/recipesConstants";

export const recipeListReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case RECIPES_LIST_REQUEST:
      return { loading: true };
    case RECIPES_LIST_SUCCESS:
      return { loading: false, recipes: action.payload };
    case RECIPES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const recipeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPES_CREATE_REQUEST:
      return { loading: true };
    case RECIPES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case RECIPES_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const recipeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPES_UPDATE_REQUEST:
      return { loading: true };
    case RECIPES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case RECIPES_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
