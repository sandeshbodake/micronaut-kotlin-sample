import React,  { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import axios from "axios";
import { SERVER_URL } from "./config";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      unauthorized: false,
      username: "",
      password: "",
    };
  }

  componentDidMount(){
    this.validateUser()
  }

  validateUser = () => {
    const { username, password } = this.state;
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

  render() {

    return (
      <BrowserRouter>
        <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/blogs" component={Blog} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
