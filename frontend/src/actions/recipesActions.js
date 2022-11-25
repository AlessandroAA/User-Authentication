import axios from "axios";
import {
  RECIPES_LIST_FAIL,
  RECIPES_LIST_REQUEST,
  RECIPES_LIST_SUCCESS,
  RECIPES_CREATE_REQUEST,
  RECIPES_CREATE_SUCCESS,
  RECIPES_CREATE_FAIL,
  RECIPES_UPDATE_REQUEST,
  RECIPES_UPDATE_SUCCESS,
  RECIPES_UPDATE_FAIL,
} from "../constants/recipesConstants";

export const listRecipes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/recipes`, config);

    dispatch({
      type: RECIPES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: RECIPES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createRecipeAction =
  (title, ingredients, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECIPES_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/recipes/create`,
        { title, ingredients, category },
        config
      );

      dispatch({
        type: RECIPES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: RECIPES_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateRecipeAction =
  (id, title, ingredients, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECIPES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/recipes/${id}`,
        { title, ingredients, category },
        config
      );

      dispatch({
        type: RECIPES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: RECIPES_UPDATE_FAIL,
        payload: message,
      });
    }
  };
