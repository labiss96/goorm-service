import React, { Component } from "react";
import { Button } from "@material-ui/core";
import auth_api from "../api/AuthAPI";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handlingChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getUserList = async () => {
    await auth_api
      .getUsers()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  login = async () => {
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    await auth_api.authLogin(data).then((result) => {
      console.log(result);
      this.setState({
        username: "",
        email: "",
        password: "",
      });
    });
  };

  render() {
    return (
      <div>
        <p>username : {this.state.username}</p>
        <Button onClick={this.getUserList}>getUser</Button>
        <hr />
        <h2>Login</h2>
        username
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handlingChange}
        />
        <br />
        email
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handlingChange}
        />
        <br />
        PW
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handlingChange}
        />
        <Button onClick={this.login}>Login!</Button>
      </div>
    );
  }
}

export default Main;
