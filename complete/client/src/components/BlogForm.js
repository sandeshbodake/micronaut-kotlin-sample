import axios from "axios";
import React, { Component } from "react";
import { SERVER_URL } from "../config";
import { Form, Button, notification, Input } from "antd";

class BlogForm extends Component {
  onFinish = (values) => {
    const { actionType } = this.props;
    switch(actionType){
      case "create":
        this.createRequest(values)
        break
      case "edit":
        this.editRequest(values)
        break
      default:
        console.log("invalid action type")
    }
  };

  createRequest = (values) => {
    const { title, subtitle, content } = values;
    let that = this;
    axios({
      method: "post",
      url: `${SERVER_URL}/blog`,
      data: {
        title: title,
        sub_title: subtitle,
        content: content,
      },
      config: { headers: { "Content-Type": "multipart/form-data" } },
      withCredentials: true,
      auth: {
        username: "sherlock",
        password: "password",
      },
    })
      .then(function (response) {
        if (response) {
          that.props.blogsHandler();
          that.props.disableModalHandler();
          notification["success"]({
            message: "Blog Added Successfully",
          });
        }
      })
      .catch(function (response) {
        notification["error"]({
          message: "Something went wrong",
        });
      });
  }

  editRequest = (values) => {
    const { title, subtitle, content } = values;
    const { blogId } = this.props;

    let that = this;

    axios({
      method: "put",
      url: `${SERVER_URL}/blog/${blogId}`,
      data: {
        title: title,
        sub_title: subtitle,
        content: content,
      },
      config: { headers: { "Content-Type": "multipart/form-data" } },
      withCredentials: true,
      auth: {
        username: "sherlock",
        password: "password",
      },
    })
      .then(function (response) {
        if (response) {
          that.props.blogsHandler();
          that.props.disableModalHandler();
          notification["success"]({
            message: "Blog Updated Successfully",
          });
        }
      })
      .catch(function (response) {
        notification["error"]({
          message: "Something went wrong",
        });
      });
  }


  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form {...layout} name="blog-form" onFinish={this.onFinish}>
        <Form.Item
          name={"title"}
          label="Title of Blog"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"subtitle"}
          label="Subtitle of Blog"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"content"} label="Content">
          <Input.TextArea rows={8} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default BlogForm;
