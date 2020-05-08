/*
    The module includes some functions of action creator
*/

import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  RESET_USER,
  RESET_TOKEN,
  RECEIVE_TOKEN
} from "./action-types";

import { reqLogin } from "../api";
import { message } from "antd";
import storageUtils from "../utils/storageUtils";

// synchronous
export const setHeaderTitle = headTitle => ({
  type: SET_HEADER_TITLE,
  data: headTitle
});

export const receiveUserSuccess = user => ({
  type: RECEIVE_USER,
  user
});

export const receiveTokenSuccess = token => ({
  type: RECEIVE_TOKEN,
  token
});

// logout
export const logout = () => {
  // delete the user in the local storage
  storageUtils.removeUser();
  storageUtils.removeToken();
  //return action
  return {
    type: RESET_USER, RESET_TOKEN
  }
};

// asynchronous
export const login = (username, password) => {
  return async dispatch => {
    const result = await reqLogin(username, password);
    // console.log(result);
    if (result.data.status === "1") {
      // dispatch action with user if success
      const user = result.data.user ? result.data.user[0] : null;
      const token = result.data.token ? result.data.token : null;
      // save the user to the local storage
      storageUtils.saveUser(user);
      storageUtils.saveToken(token);
      message.success("Login successful!");
      // console.log(token);
      dispatch(receiveUserSuccess(user));
      dispatch(receiveTokenSuccess(token));
    }
    return null;
  };
};
