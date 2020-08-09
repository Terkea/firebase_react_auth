import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD27sZeLwhaUJmNMMA2MpED93zg2YHIeHo",
  authDomain: "social-network-df1d6.firebaseapp.com",
  databaseURL: "https://social-network-df1d6.firebaseio.com",
  projectId: "social-network-df1d6",
  storageBucket: "social-network-df1d6.appspot.com",
  messagingSenderId: "1097226061811",
  appId: "1:1097226061811:web:087db3dcfed03d356eb486",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage()
export const firestore = firebase.firestore();
