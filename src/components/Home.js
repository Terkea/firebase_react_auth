import React from "react";

import { connect } from "react-redux";
import { firestore } from "../firebase";

const Home = (props) => {
  return (
    <div>
      {props.payload ? (
        <b>Hi, {props.payload.email}</b>
      ) : (
        "Never seen you before"
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    payload: state.user.payload,
  };
};

export default connect(mapStateToProps, null)(Home);
