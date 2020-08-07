import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import * as actions from "../store/actions/user";

import { Row, Col, Form, Input, Button, Typography, AutoComplete } from "antd";
import { LockOutlined, RocketOutlined, MailOutlined } from "@ant-design/icons";

import SvgBackground from "../containers/SvgBackground";

const { Title, Text } = Typography;

const styles = {
  heightForTheRow: {
    minHeight: "100%",
    background: "rgba(220, 220, 220, 0.2)",
  },
  logo: {
    fontSize: "100px",
    width: "100%",
    marginBottom: "30px",
  },
  loginButton: {
    width: "100%",
  },
};

const Login = (props) => {
  const history = useHistory();
  // Check if the user is authenticated
  useEffect(() => {
    try {
      if (props.payload.providerData) {
        history.push("/");
      }
    } catch {}
  });

  // E-mail autocomplete
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value || value.search("@") !== -1) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com"].map(
          (domain) => `${value}${domain}`
        )
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const onFinish = (values) => {
    props.signInUser(values.email, values.password);
  };

  return (
    <SvgBackground>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={styles.heightForTheRow}
      >
        <Col sm={14} md={14} lg={6}>
          <RocketOutlined style={styles.logo} />
          <Title align="middle">Login</Title>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
                <Input
                  placeholder="Email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                />
              </AutoComplete>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                style={styles.loginButton}
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          {/* error handling */}
          {props.error ? <Text type="danger">{props.error}</Text> : null}
        </Col>
      </Row>
    </SvgBackground>
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
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
