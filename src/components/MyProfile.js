import React, { useEffect, useState } from "react";

import { Input, Form, Row, Col, Typography, Avatar, Button, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useHistory, Link } from "react-router-dom";

// import ChangePassword from "./CustomModal";
import { runNotifications } from "../helpers/Notification";
import UploadProfilePicture from "./UploadProfilePicture";
import { useSelector, connect } from "react-redux";
import { useFirebase } from "react-redux-firebase";

const { Title, Text } = Typography;
const { TextArea } = Input;

const MyProfile = (props) => {
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);
  // ANTD FORM INPUT TRICKERY
  // https://stackoverflow.com/a/61244400/8193864
  // https://stackoverflow.com/a/62855456/8193864
  // console.log(error);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [passwordModalVisibility, setPasswordModalVisibility] = useState(false);

  const [avatar, setAvatar] = useState("");

  const styles = {
    logo: {
      fontSize: "100px",
      width: "100%",
      marginBottom: "30px",
    },
    mainRow: {
      height: "50vh",
      paddingTop: "30px",
    },
  };

  const history = useHistory();
  useEffect(() => {
    // Set up the default values for the inputs
    form.setFieldsValue({
      newEmail: auth.email,
      displayName: profile.username,
      bio: profile.bio,
    });

    if (props.authError) {
      runNotifications(props.authError.message, "ERROR");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
  }, [form, props.authError, profile.bio, auth.email, profile.username]);

  const onFinish = (values) => {
    if (values.newEmail !== auth.email) {
      firebase
        .login({ email: auth.email, password: values.current_password })
        .then(() => {
          firebase
            .updateEmail(values.newEmail)
            .then(() => {
              runNotifications(
                `Email address updated to ${values.newEmail}`,
                "SUCCESS"
              );
            })
            .catch((e) => {
              console.log();
              runNotifications(e.message, "ERROR");
            });
        });
    }

    firebase
      .login({ email: auth.email, password: values.current_password })
      .then(() => {
        firebase
          .updateProfile({
            username: values.displayName,
            bio: values.bio,
          })
          .catch((e) => {
            runNotifications(e.message, "ERROR");
          });
      });
  };

  const onOkModal = () => {
    form2.submit();
  };

  const onFinishModals = (values) => {
    // props.updateUserPassword(
    //   {
    //     email: props.payload.user.email,
    //     currentPassword: values.currentPassword,
    //     newPassword: values.newPassword,
    //   },
    //   runNotifications
    // );
    setPasswordModalVisibility(false);
  };

  return (
    <Row justify="center" style={styles.mainRow}>
      <Modal
        title="Change password"
        visible={passwordModalVisibility}
        onOk={onOkModal}
        onCancel={() => {
          setPasswordModalVisibility(false);
          console.log("Something is fucked");
        }}
      >
        <LockOutlined style={styles.logo} />
        <Text type="secondary">
          If you only use words from a dictionary or a purely numeric password,
          a hacker only has to try a limited list of possibilities.
        </Text>
        <Form
          style={{ marginTop: "20px" }}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinishModals}
          form={form2}
        >
          <Form.Item
            name="currentPassword"
            label="Current password"
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
            />
          </Form.Item>
          <Form.Item
            label="New password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input the new password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
            />
          </Form.Item>
          <Form.Item
            name="newPasswordConfirm"
            label="New password confirm"
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
            />
          </Form.Item>
        </Form>
      </Modal>

      <Col md={14} xs={24}>
        <Row align="center">
          <Avatar
            align="middle"
            src={avatar}
            size={256}
            icon={<UserOutlined />}
          />
        </Row>
        <Row style={{ marginTop: "20px" }} align="center">
          {/* <UploadProfilePicture /> */}
        </Row>
        <Title
          style={{ marginBottom: "30px", marginTop: "30px", maxHeight: "20px" }}
          align="center"
          level={4}
        ></Title>
        <Row align="center">
          <Col md={4} xs={0}>
            <Title level={4}>Display name</Title>
            <Title level={4}>E-mail</Title>
            <Title level={4}>Current password</Title>
            <Title level={4}>Bio</Title>
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

              <Form.Item
                name="bio"
                rules={[
                  {
                    required: false,
                    message: "Please input your bio!",
                  },
                ]}
              >
                <TextArea autoSize={{ minRows: 2, maxRows: 2 }} />
              </Form.Item>

              <Row align="middle">
                <Col span={12}>
                  <Button type="primary" htmlType="submit">
                    Update profile
                  </Button>
                </Col>
                <Col span={12} align="end">
                  <Link
                    to="#"
                    // style={{ marginLeft: "10px", width: "100%" }}
                    onClick={() => {
                      setPasswordModalVisibility(true);
                    }}
                    type="primary"
                  >
                    Change password
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { authError } }) => ({
    authError,
  })
);

export default enhance(MyProfile);
