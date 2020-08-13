import { render } from "react-dom";
import { Provider, useSelector } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers, compose } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  useFirestoreConnect,
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

// Setup react-redux so that connect HOC can be used
const firebaseConfig = {
  apiKey: "AIzaSyBTsTbuSzXGMQul-PBIgPZtgL5OjMrBr38",
  authDomain: "testing-37a68.firebaseapp.com",
  databaseURL: "https://testing-37a68.firebaseio.com",
  projectId: "testing-37a68",
  storageBucket: "testing-37a68.appspot.com",
  messagingSenderId: "60762660399",
  appId: "1:60762660399:web:7ab828e6b22b4a971cb0da",
};

// react-redux-firebase config
export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true, // attaches auth is ready promise to store
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
export const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
