import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link, withRouter, useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/user";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    try {
      setIsAuthenticated(props.payload.providerData);
    } catch {}
  }, [isAuthenticated]);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]}>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/login">
            <Link to="/login/">Login</Link>
          </Menu.Item>
          {isAuthenticated ? (
            <Menu.Item key="/register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          ) : (
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

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    payload: state.user.payload,
  };
};
export default withRouter(connect(mapStateToProps, null)(CustomLayout));
