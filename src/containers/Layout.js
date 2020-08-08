import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  Link,
  withRouter,
  useLocation,
  Redirect,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/user";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]}>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>

          {/* PUBLIC ROUTES */}

          {props.isAuthenticated === false ? (
            <Menu.Item key="/login">
              <Link to="/login/">Login</Link>
            </Menu.Item>
          ) : null}

          {props.isAuthenticated === false ? (
            <Menu.Item key="/register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          ) : null}

          {/* AUTH ROUTES */}
          {props.isAuthenticated === false ? null : (
            <Menu.Item key="/logout">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ padding: 24 }}>{props.children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>IDK YET</Footer>
    </Layout>
  );
};


export default CustomLayout;
