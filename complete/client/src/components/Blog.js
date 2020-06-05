import axios from "axios";
import React, { Component } from "react";
import { SERVER_URL } from "../config";
import {
  PageHeader,
  Tag,
  Typography,
  Row,
  Card,
  Empty,
  Button,
  notification,
  Modal,
  Affix,
  Input,
  Col,
} from "antd";

import BlogForm from "./BlogForm";
import {
  DeleteFilled,
  EditOutlined,
  PlusCircleFilled,
  UnorderedListOutlined,
  HighlightOutlined
} from "@ant-design/icons";

const { Paragraph } = Typography;

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      unauthorized: true,
      modalVisible: false,
      editModalVisible: false,
      createModalVisible: false,
      activeEditBlogId: undefined,
      formData: {
        title: "",
        sub_title: "",
        content: "",
      },
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

  handleSearchChange = (e) => {
    let that = this;
    const { value } = e.target;

    if (value.length > 0) {
      axios
        .get(`${SERVER_URL}/search_blogs?key=${value}`, {
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
    }
  };

  onFinish = (values) => {};

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

  setEditModalVisible = (editModalVisible) => {
    this.setState({ editModalVisible: editModalVisible });
  };

  setCreateModalVisible = (createModalVisible) => {
    this.setState({ createModalVisible: createModalVisible });
  };

  disableModal = () => {
    this.setState({ createModalVisible: false, editModalVisible: false });
  };

  updateBlog = (blogId) => {
    let that = this;
    axios({
      method: "get",
      url: `${SERVER_URL}/blog/${blogId}`,
      config: { headers: { "Content-Type": "multipart/form-data" } },
      withCredentials: true,
      auth: {
        username: "sherlock",
        password: "password",
      },
    }).then(function (response) {
      if (response) {
        that.setEditModalVisible(true);
        that.setState({
          activeEditBlogId: blogId,
        });
        const { title, sub_title, content } = response.data;
        that.setState({
          formData: {
            title: title,
            sub_title: sub_title,
            content: content,
          },
        });
      }
    });
  };

  render() {
    const { blogs } = this.state;
    let that = this;
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
        <Card bordered={false}>
          <Affix>
            <Row
              gutter={16}
              style={{ backgroundColor: "#ffffff", padding: "20px" }}
            >
              <Col span={6}>
                <Button
                  type="primary"
                  onClick={() => this.setCreateModalVisible(true)}
                >
                  <PlusCircleFilled /> New Blog
                </Button>
              </Col>

              <Col span={6}>
                <Input
                  placeholder="Search Blog Here"
                  onChange={this.handleSearchChange}
                />
              </Col>

              <Col span={2}>
                <Button type="primary" icon={<UnorderedListOutlined/>} onClick={that.fetchBlogs}>
                  Show All Blog
                </Button>
              </Col>
            </Row>
          </Affix>
        </Card>

        <Modal
          title="Add New Blog"
          centered
          visible={this.state.createModalVisible}
          onCancel={() => this.setCreateModalVisible(false)}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <BlogForm
            blogsHandler={this.fetchBlogs}
            actionType={"create"}
            disableModalHandler={this.disableModal}
          />
        </Modal>

        <Modal
          title="Edit Blog"
          centered
          visible={this.state.editModalVisible}
          onCancel={() => that.setEditModalVisible(false)}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <BlogForm
            blogsHandler={this.fetchBlogs}
            actionType={"edit"}
            blogId={this.state.activeEditBlogId}
            disableModalHandler={this.disableModal}
            formData={this.state.formData}
          />
        </Modal>

          {blogs.length === 0 && (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
            ></Empty>
          )}
          {blogs.length > 0 &&
            blogs.map((blog, index) => (
              <Card style={{ width: "70%", marginLeft: "20%", marginBottom: "20px" }}>
                <PageHeader
                  title={blog.title}
                  className="site-page-header"
                  subTitle={blog.sub_title}
                  tags={<Tag color="blue">Published</Tag>}
                  avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                  extra={[
                    <Button
                      key={`${index}_${blog.title}_delete`}
                      value={blog.id}
                      type="danger"
                      onClick={() => this.deleteBlog(blog.id)}
                    >
                      <DeleteFilled />
                      Delete
                    </Button>,  

                    <Button
                      key={`${index}_${blog.title}_update`}
                      value={blog.id}
                      type="primary"
                      onClick={() => this.updateBlog(blog.id)}
                    >
                      <EditOutlined />
                      Edit
                    </Button>,
                  ]}
                >
                  <Content
                    extraContent={
                      <img
                        src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                        alt="content"
                      />
                    }
                  >
                    {content(blog.content)}
                  </Content>
                </PageHeader>

              </Card>
            ))}
      </>
    );
  }
}

export default Blog;
