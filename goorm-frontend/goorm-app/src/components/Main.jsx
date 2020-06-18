import React, { Component } from "react";
import { Button } from "@material-ui/core";
import auth_api from "../api/AuthAPI";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
    };
  }
  getUserList = async () => {
    await auth_api
      .getUsers()
      .then((result) => {
        console.log(result);
        this.setState({
          userId: "",
          username: "",
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <p>username : {this.state.username}</p>
        <Button onClick={this.getUserList}>Btn</Button>
      </div>
    );
  }
}

export default Main;
