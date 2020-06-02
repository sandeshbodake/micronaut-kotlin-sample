import axios from "axios";
import React, { Component } from "react";
import { SERVER_URL } from "../config";
import {
  PageHeader,
  Form,
  Button,
  Tag,
  Typography,
  Row,
  Card,
  Modal,
  Input,
} from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

const { Paragraph } = Typography;

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      unauthorized: true,
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.fetchBlogs();
  }

  fetchBlogs = () => {
    let that = this;
    axios
      .get(`${SERVER_URL}/blogs`, {
        params: {},
        withCredentials: true,
        auth: {
          username: "sherlock",
          password: "password",
        },
      })
      .then((response) => {
        that.setState({
          blogs: response.data,
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

  onFinish = (values) => {};

  setModalVisible(modalVisible) {
    this.setState({ modalVisible: modalVisible });
  }

  render() {
    const { blogs } = this.state;

    const content = (content) => (
      <>
        <Paragraph>{content}</Paragraph>
      </>
    );

    const Content = ({ children, extraContent }) => {
      return (
        <Row>
          <div style={{ flex: 1 }}>{children}</div>
          <div className="image">{extraContent}</div>
        </Row>
      );
    };

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

        <Card style={{ width: "50%", marginLeft: "20%" }}>
          {blogs.map((blog) => (
            <PageHeader
              title={blog.title}
              className="site-page-header"
              subTitle={blog.sub_title}
              tags={<Tag color="blue">Running</Tag>}
              avatar={{
                src:
                  "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
              }}
            >
              <Content
                extraContent={
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                    alt="content"
                    width="100%"
                  />
                }
              >
                {content(blog.content)}
              </Content>
            </PageHeader>
          ))}
        </Card>
      </>
    );
  }
}

export default Blog;
