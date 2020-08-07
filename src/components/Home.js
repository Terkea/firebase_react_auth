import React, { useEffect } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../store/actions/user";

const Home = (props) => {
  return <div>{props.payload ? <b>Hi, {props.payload.email}</b> : "Never seen you before"}</div>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    payload: state.user.payload,
  };
};

export default connect(mapStateToProps, null)(Home);
