import React, { Component } from "react";
import { Container } from "@material-ui/core";
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
        //test
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container maxWidth="lg">
        <p>
          <Store.Consumer>
            {(store) =>
              store.logged ? (
                <>
                  <h1>Welcome to Goorm Service</h1>
                </>
              ) : (
                <>
                  <h1>Welcome to Goorm Service</h1>
                  <h2>회원가입 및 로그인 후 서비스를 제공받을 수 있습니다.</h2>
                </>
              )
            }
          </Store.Consumer>
        </p>
      </Container>
    );
  }
}

export default Main;
