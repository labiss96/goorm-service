import React, { Component } from "react";
import { Button } from "@material-ui/core";
import auth_api from "../api/AuthAPI";
import AuthContext from "../context/AuthContext";

class Main extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.context);
    console.log(this.context.logged);
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

  logout = async () => {
    await auth_api
      .authLogout()
      .then((result) => {
        console.log(result);
        window.sessionStorage.clear();
        this.context.onLogout();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Button onClick={this.getUserList}>getUser</Button>
        <Button onClick={this.logout}>Logout</Button>
        <p>
          현재 상태 : {this.context.logged === true ? <>True</> : <>False</>}
        </p>
        <hr />
      </div>
    );
  }
}

export default Main;
