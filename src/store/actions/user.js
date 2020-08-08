import firebase from "firebase/app";
import * as actionTypes from "./actionTypes";
import { auth } from "../../firebase";

export const registerStart = (email) => {
  return {
    type: actionTypes.REGISTER_START,
    error: null,
    loading: true,
    payload: { email },
  };
};

export const registerFail = (error) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error,
    loading: true,
    payload: null,
  };
};

export const registerSuccess = (user) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    error: null,
    loading: true,
    payload: user,
  };
};

export const authStart = (email) => {
  return {
    type: actionTypes.AUTH_START,
    error: null,
    loading: true,
    payload: { email },
    isAuthenticated: false,
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    error: null,
    loading: false,
    payload: user,
    isAuthenticated: true,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    loading: false,
    payload: null,
    isAuthenticated: false,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
    error: null,
    loading: false,
    payload: null,
    isAuthenticated: false,
  };
};

export const registerUser = (email, password) => (dispatch) => {
  dispatch(registerStart(email));

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(data);
      dispatch(registerSuccess(data));
    })
    .catch((err) => {
      console.log(err.message);
      dispatch(registerFail(err.message));
    });
};

export const signInUser = (email, password) => (dispatch) => {
  dispatch(authStart(email));

  auth
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(data.user);
      dispatch(authSuccess(data.user));
      localStorage.setItem("authUser", JSON.stringify(data.user));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err.message));
    });
};

export const autoLogin = () => (dispatch) => {
  if (JSON.parse(localStorage.getItem("authUser"))) {
    dispatch(authSuccess(JSON.parse(localStorage.getItem("authUser"))));
  } else {
    dispatch(logoutUser());
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("authUser");
  auth.signOut();
  dispatch(logout());
};
