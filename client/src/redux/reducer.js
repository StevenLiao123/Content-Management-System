/*
    The reducer is a function, which used to return new state based on the prevState and actions
*/
import { combineReducers } from "redux";
import storageUtils from "../utils/storageUtils";
import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN
} from "./action-types";

// The function is used to manage the title of the header
const initialHeaderTitle = "Home";
function headerTitle(state = initialHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data;
    default:
      return state;
  }
}

// The function is used to manage the currrent user
const initialUser = storageUtils.getUser();
function user(state = initialUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case RESET_USER:
      return {};
    default:
      return state;
  }
}

// The function is used to manage the current token
const initialToken = storageUtils.getToken();
function token(state = initialToken, action) {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return action.token;
    case RESET_TOKEN:
      return "";
    default:
      return state;
  }
}

export default combineReducers({
  headerTitle,
  user,
  token
});
