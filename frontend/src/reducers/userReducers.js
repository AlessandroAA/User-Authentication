import { USER_LOGIN_REQUEST } from "../constants/userConstants";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";
import { USER_LOGIN_FAIL } from "../constants/userConstants";
import { USER_LOGOUT } from "../constants/userConstants";
import { USER_REGISTER_REQUEST } from "../constants/userConstants";
import { USER_REGISTER_SUCCESS } from "../constants/userConstants";
import { USER_REGISTER_FAIL } from "../constants/userConstants";
import { USER_UPDATE_REQUEST } from "../constants/userConstants";
import { USER_UPDATE_SUCCESS } from "../constants/userConstants";
import { USER_UPDATE_FAIL } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
