import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, useHistory } from "react-router-dom";
import * as actions from "../store/actions/user";

import { Form, Input, Button, Typography } from "antd";

const { Title, Text } = Typography;

const Login = (props) => {
  const history = useHistory();

  const onFinish = (values) => {
    props.signInUser(values.email, values.password);
    history.push("/");
  };

  return (
    <>
      <Title>Login</Title>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* error handling */}
      {props.error ? <Text type="danger">{props.error}</Text> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    payload: state.user.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  //
  return {
    signInUser: (email, password) =>
      dispatch(actions.signInUser(email, password)),
    autoLogIn: () => dispatch(actions.autoLogin()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
