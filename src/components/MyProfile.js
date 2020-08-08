import React, { useEffect, useState } from "react";
import { Input, Form, Row, Col, Typography, Avatar, Button } from "antd";
import { UserOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import * as actions from "../store/actions/user";
import { useHistory } from "react-router-dom";

const { Title, Text } = Typography;

const MyProfile = (props) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [currentDisplayName, setCurrentDisplayName] = useState(null);

  const handleInputChange = (e) =>
    setCurrentEmail({
      ...currentEmail,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  // Check if the user is authenticated
  const history = useHistory();
  useEffect(() => {
    if (props.isAuthenticated) {
      history.push("/");
    }
    try {
      setCurrentEmail(props.payload.providerData[0].email);
      setAvatar(props.payload.providerData[0].photoURL);
      setCurrentDisplayName(props.payload.providerData[0].displayName);
    } catch (error) {}
  });

  // console.log(sex);

  // https://stackoverflow.com/a/61244400/8193864
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.updateUserProfile({
      displayName: values.displayName,
      newEmail: values.newEmail,
      oldEmail: props.payload.email,
      password: values.current_password,
      photoURL: values.photoURL,
    });
  };

  return (
    <Row
      justify="center"
      style={{
        height: "50vh",
        paddingTop: "30px",
      }}
    >
      <Col md={14} xs={24}>
        <Row align="center">
          <Avatar align="middle" size={128} icon={<UserOutlined />} />
        </Row>
        <Title style={{ marginBottom: "30px" }} align="center" level={4}>
          <a>Change profile photo</a>
        </Title>
        <Row align="center">
          <Col md={4} xs={0}>
            <Title level={4}>Display name</Title>
            <Title level={4}>E-mail</Title>
            <Title level={4}>Current password</Title>
          </Col>

          <Col style={{ marginLeft: "10px" }} md={8}>
            <Form
              // initialValues={{
              //   newEmail: currentEmail,
              // }}
              form={form}
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="displayName"
                rules={[
                  {
                    required: true,
                    message: "Please input your display name!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="newEmail"
                rules={[
                  { required: false, message: "Please input your E-mail!" },
                ]}
              >
                <Input
                  name="newEmail"
                  key={`email:${(currentEmail)=>""}`}
                  defaultValue={currentEmail}
                  onChange={handleInputChange}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="current_password"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button style={{ marginLeft: "10px" }} type="primary">
                Change password
              </Button>
            </Form>
            {/* error handling */}
            {props.error ? (
              <Text type="danger" style={{ marginTop: "20px" }}>
                {props.error}
              </Text>
            ) : null}
          </Col>
        </Row>
      </Col>
    </Row>
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
  return {
    updateUserProfile: (user, data) =>
      dispatch(actions.updateProfile(user, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
