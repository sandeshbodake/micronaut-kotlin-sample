import { Alert, Button, Card, Checkbox, Form, Input } from "antd";
import axios from "axios";
import React, { Component } from "react";
import { SERVER_URL } from "../config";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unauthorized: false,
    };
  }

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };

    const onFinish = (values) => {
      const { username, password } = values;
      let that = this;
      axios
        .get(`${SERVER_URL}/login`, {
          params: {},
          withCredentials: true,
          auth: {
            username: username,
            password: password,
          },
        })
        .then((response) => {
          that.setState({
            unauthorized: false,
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.setState({
              unauthorized: true,
            });
          }
        });
    };

    return (
      <Card
        title="Login"
        bordered={false}
        style={{ width: "50%", marginLeft: "20%" }}
      >
        {this.state.unauthorized && (
          <Alert
            message="Unauthorize User Credentials"
            description="Please input correct username and password."
            type="error"
            showIcon
            style={{ marginBottom: "3%" }}
          />
        )}

        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default LoginForm;
