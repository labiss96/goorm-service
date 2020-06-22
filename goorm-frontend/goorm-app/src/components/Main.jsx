import React, { Component } from "react";
import { Button } from "@material-ui/core";
import auth_api from "../api/AuthAPI";
import Store from "store";

class Main extends Component {
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

  render() {
    return (
      <div>
        <Button onClick={this.getUserList}>getUser</Button>
        <p>
          <Store.Consumer>
            {(store) => JSON.stringify(store.logged)}
          </Store.Consumer>
        </p>
        <hr />
      </div>
    );
  }
}

export default Main;
