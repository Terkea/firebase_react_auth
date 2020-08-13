import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CustomLayout from "./containers/Layout";
import MyProfile from "./components/MyProfile";

import "antd/dist/antd.less"; // or 'antd/dist/antd.less'
import "./App.css";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import { store, rrfProps } from "./createStore";

const App = (props) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <CustomLayout {...props}>
              <Route exact path="/" component={Home} />
              <Route exact path="/my_profile" component={MyProfile} />
            </CustomLayout>
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
