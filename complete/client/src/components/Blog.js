import axios from "axios";
import React, { Component } from "react";
import { SERVER_URL } from "../config";
import {
  PageHeader,
  Tag,
  Typography,
  Row,
  Card,
  Divider,
  Empty,
  Button,
  notification,
} from "antd";

import BlogForm from "./BlogForm";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";

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

  deleteBlog = (blog_id) => {
    var that = this;
    axios({
      method: "delete",
      url: `${SERVER_URL}/blog/${blog_id}`,
      config: { headers: { "Content-Type": "multipart/form-data" } },
      withCredentials: true,
      auth: {
        username: "sherlock",
        password: "password",
      },
    })
      .then(function (response) {
        if (response) {
          that.fetchBlogs();

          notification["success"]({
            message: "Blog Deleted Successfully",
          });
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

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

    return (
      <>
        <Card style={{ marginBottom: "5%" }} bordered={false}>
          <BlogForm blogsHandler={this.fetchBlogs} />
        </Card>

        <Card style={{ width: "50%", marginLeft: "20%" }}>
          {blogs.length === 0 && (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
            >
            </Empty>
          )}
          {blogs.length > 0 &&
            blogs.map((blog, index) => (
              <>
                <PageHeader
                  title={blog.title}
                  className="site-page-header"
                  subTitle={blog.sub_title}
                  tags={<Tag color="blue">Published</Tag>}
                  avatar={{
                    src:
                      "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
                  }}
                  extra={[
                    <Button
                      key={index}
                      value={blog.id}
                      type="danger"
                      onClick={() => this.deleteBlog(blog.id)}
                    >
                      <DeleteFilled />
                      Delete
                    </Button>,

                    <Button
                      key={index}
                      value={blog.id}
                      type="primary"
                      // onClick={() => this.deleteBlog(blog.id)}
                    >
                      <EditOutlined />
                      Edit
                    </Button>
                  ]}
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

                {index !== blogs.length - 1 && <Divider />}
              </>
            ))}
        </Card>
      </>
    );
  }
}

export default Blog;
