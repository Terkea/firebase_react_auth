import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  error: null,
  payload: null,
};

const registerStart = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    payload: action.payload,
  });
};

const registerSuccess = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    error: action.error,
    payload: action.payload,
  });
};

const registerFail = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    error: action.error,
  });
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    payload: action.payload,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    error: action.error,
    payload: action.payload,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    error: action.error,
  });
};

const logout = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    error: action.error,
    payload: action.payload,
  });
};

const handlers = {
  [actionTypes.AUTH_START]: authStart,
  [actionTypes.AUTH_SUCCESS]: authSuccess,
  [actionTypes.AUTH_FAIL]: authFail,
  [actionTypes.REGISTER_START]: registerStart,
  [actionTypes.REGISTER_FAIL]: registerFail,
  [actionTypes.REGISTER_SUCCESS]: registerSuccess,
  [actionTypes.LOGOUT]: logout,
};

const reducer = (state = initialState, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export default reducer;
