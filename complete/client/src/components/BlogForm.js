import axios from "axios";
import React, { Component } from "react";
import { SERVER_URL } from "../config";
import { Form, Button, notification, Modal, Input, Affix } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  onFinish = (values) => {
    const { title, subtitle, content } = values;
    var that = this;
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
          that.setModalVisible(false);

          notification["success"]({
            message: "Blog Added Successfully"
          });
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible: modalVisible });
  }

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Affix offsetTop={20}>
        <Modal
          title="Add New Blog"
          centered
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
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
        </Modal>
        <Button type="primary" onClick={() => this.setModalVisible(true)}>
          <PlusCircleFilled /> New Blog
        </Button>
      </Affix>
    );
  }
}
export default BlogForm;
