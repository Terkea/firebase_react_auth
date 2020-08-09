import React, { useEffect, useState } from "react";

import { Input, Form, Row, Col, Typography, Avatar, Button, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../store/actions/user";
// import ChangePassword from "./CustomModal";

const { Title, Text } = Typography;

const MyProfile = (props) => {
  // ANTD FORM INPUT TRICKERY
  // https://stackoverflow.com/a/61244400/8193864
  // https://stackoverflow.com/a/62855456/8193864

  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [currentEmail, setCurrentEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentDisplayName, setCurrentDisplayName] = useState("");
  const [passwordModalVisibility, setPasswordModalVisibility] = useState(false);

  const history = useHistory();
  useEffect(() => {
    // Check if the user is authenticated
    if (props.isAuthenticated) {
      history.push("/");
    }

    // Assign the values with hooks since without it'd crash cuz the app is initialized with a null payload
    try {
      setCurrentEmail(props.payload.providerData[0].email);
      setAvatar(props.payload.providerData[0].photoURL);
      setCurrentDisplayName(props.payload.providerData[0].displayName);

      // Set up the default values for the inputs
      form.setFieldsValue({
        newEmail: currentEmail,
        displayName: currentDisplayName,
      });
    } catch (error) {}
  });

  const onFinish = (values) => {
    props.updateUserProfile({
      displayName: values.displayName,
      newEmail: values.newEmail || currentEmail,
      oldEmail: props.payload.email,
      password: values.current_password,
      photoURL: values.photoURL,
    });
  };

  const onOkModal = () => {
    form2.submit();
  };

  const onFinishModals = (values) => {
    props.updateUserPassword({
      email: props.payload.email,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
    setPasswordModalVisibility(false);
  };

  return (
    <Row
      justify="center"
      style={{
        height: "50vh",
        paddingTop: "30px",
      }}
    >
      <Modal
        title="Change password"
        visible={passwordModalVisibility}
        onOk={onOkModal}
        onCancel={() => {
          setPasswordModalVisibility(false);
          console.log("Something is fucked");
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinishModals}
          form={form2}
        >
          <Form.Item
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your Current password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Current password"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input the new password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New password"
            />
          </Form.Item>
          <Form.Item
            name="newPasswordConfirm"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New password confirm"
            />
          </Form.Item>
        </Form>
      </Modal>

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
              form={form}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
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
              <Button
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  setPasswordModalVisibility(true);
                }}
                type="primary"
              >
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
    updateUserProfile: (data) => dispatch(actions.updateProfile(data)),
    updateUserPassword: (data) => dispatch(actions.updatePassword(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
