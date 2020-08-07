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
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    error: null,
    loading: false,
    payload: user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    loading: false,
    payload: null,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
    error: null,
    loading: false,
    payload: null,
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
      console.log(data);
      dispatch(authSuccess(data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err.message));
    });
};

export const autoLogin = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(authSuccess(user));
    }
  });
};

export const logoutUser = () => (dispatch) => {
  auth.signOut();
  dispatch(logout());
};
