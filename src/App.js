import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import CustomLayout from "./containers/Layout";

import { connect } from "react-redux";
import * as actions from "./store/actions/user";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";

const App = (props) => {
  useEffect(() => {
    props.autoLogIn();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />

        <CustomLayout {...props}>
          <Route exact path="/" component={Home} />
        </CustomLayout>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    payload: state.user.payload,
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogIn: () => dispatch(actions.autoLogin()),
    logout: () => dispatch(actions.logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
