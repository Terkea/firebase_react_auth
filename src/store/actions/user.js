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

export const updateProfileSuccess = (user) => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    error: null,
    loading: false,
    payload: user,
    isAuthenticated: true,
  };
};

export const updateProfileFail = (error) => {
  return {
    type: actionTypes.UPDATE_PROFILE_FAIL,
    error: error,
    loading: false,
    isAuthenticated: true,
  };
};

export const updatePasswordSuccess = (user) => {
  return {
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
    error: null,
    loading: false,
    payload: user,
    isAuthenticated: true,
  };
};

export const updatePasswordFail = (error) => {
  return {
    type: actionTypes.UPDATE_PASSWORD_FAIL,
    error: error,
    loading: false,
  };
};

// IF SOME BITS FROM HERE LOOK CONFUSING
// CHECK ON THE FIREBASE DOCS
// https://firebase.google.com/docs/auth/web/manage-users

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
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err.message));
    });
};

// Checks for the existence of the user object in localStorage
// if it exists auto logs in the user based on that object
// otherwise use the firebase observer to detect the logged-in user
// and dispatches the appropriate actions

// the reason why I opted for this approach is well explained in here
// https://stackoverflow.com/q/63309298/8193864
export const autoLogin = () => (dispatch) => {
  if (JSON.parse(localStorage.getItem("authUser"))) {
    dispatch(authSuccess(JSON.parse(localStorage.getItem("authUser"))));
  } else {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
        dispatch(authSuccess(user));
      } else {
        dispatch(logoutUser);
      }
    });
  }
};

// Removes the localStorage user object, destroys the
// firebase auth session and dispatches the logout action
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("authUser");
  auth.signOut();
  dispatch(logout());
};

// The data object holds all the required attributes to perform the update
// oldPassword, newPassword and the other fields which are less important
// First we log in the user using his current e-mail address and the current password
// because firebase doesn't allow us to perform some actions without a freshly logged user
// If the data object holds a new email address we have to address that request separately
// the other fields who came by default are dealt on the other clause
// additionally there could be added the fields from the user profile
// once the user is updated refreshes the localStorage instance of it
export const updateProfile = (data) => (dispatch) => {
  auth
    .signInWithEmailAndPassword(data.oldEmail, data.password)
    .then((res) => {
      if (data.newEmail) {
        console.log(res.user);
        res.user
          .updateEmail(data.newEmail)
          .then(() => {
            localStorage.removeItem("authUser");
            localStorage.setItem("authUser", JSON.stringify(res.user));
            dispatch(updateProfileSuccess(res.user));
          })
          .catch((err) => {
            console.log(err);
            dispatch(updateProfileFail(err.message));
          });

        res.user
          .updateProfile({
            displayName: data.displayName,
            photoURL: data.photoURL,
          })
          .then(() => {
            localStorage.removeItem("authUser");
            localStorage.setItem("authUser", JSON.stringify(res.user));
            dispatch(updateProfileSuccess(res.user));
          })
          .catch((err) => {
            console.log(err);
            dispatch(updateProfileFail(err.message));
          });
      }
    })
    .catch((err) => {
      console.log("EROARE LOGIN", err);
      dispatch(updateProfileFail(err.message));
    });
};

// the data object contains the email and both passwords
// firebase asks for a recently signed in user to perform update password
// once done that dispatch the appropiate actions
export const updatePassword = (data) => (dispatch) => {
  auth
    .signInWithEmailAndPassword(data.email, data.currentPassword)
    .then((res) => {
      res.user
        .updatePassword(data.newPassword)
        .then((response) => {
          localStorage.removeItem("authUser");
          localStorage.setItem("authUser", JSON.stringify(res.user));
          dispatch(updatePasswordSuccess(res.user));
        })
        .catch((err) => {
          dispatch(updatePasswordFail(err.message));
        });
    })
    .catch((err) => {
      dispatch(updatePasswordFail(err.message));
    });
};

export const forgottenPassword = (email, notificationCallback) => (
  dispatch
) => {
  auth
    .sendPasswordResetEmail(email)
    .then((res) => {
      notificationCallback(
        `Thanks! Please check ${email} for a link to reset your password.`,
        "SUCCESS"
      );
    })
    .catch((error) => {
      notificationCallback(error.message, "ERROR");
    });
};
