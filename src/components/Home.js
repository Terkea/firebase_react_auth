import React from "react";

import { connect } from "react-redux";

const Home = (props) => {
  return (
    <div>
      {props.payload ? (
        <b>Hi {props.payload.user.email}</b>
      ) : (
        "Never seen you before"
      )}
    </div>
  );
};

export default Home;
