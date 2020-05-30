import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import LoginForm from './components/LoginForm'

class App extends Component {

  render() {

    return (
     <LoginForm />
    );
  }
}

export default App;
