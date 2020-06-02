import axios from "axios";
import React, { Component } from "react";
import { SERVER_URL } from "../config";
import {
  Form,
  Button,
  Card,
  Modal,
  Input,
} from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

class BlogFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  onFinish = (values) => {};

  setModalVisible(modalVisible) {
    this.setState({ modalVisible: modalVisible });
  }

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <>
        <Card>
          <Modal
            title="Add New Blog"
            centered
            visible={this.state.modalVisible}
            onOk={() => this.setModalVisible(false)}
            onCancel={() => this.setModalVisible(false)}
            okText="Submit"
          >
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
            >
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
            </Form>
          </Modal>
          <Button type="primary" onClick={() => this.setModalVisible(true)}>
            <PlusCircleFilled /> New Blog
          </Button>
        </Card>
      </>
    );
  }
}
const BlogForm = Form.create({ name: "modal_form" })(BlogFormComponent);

export default BlogForm;
