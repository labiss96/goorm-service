import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MenuAppbar from "./components/MenuAppBar.jsx";
import Main from "./components/Main";
import Login from "./components/account/Login";
import Profile from "./components/account/Profile";
import Registration from "./components/account/Registration";

import ProductList from "./components/product/ProductList";
import ProductForm from "./components/product/ProductForm";
import ProductDetail from "./components/product/ProductDetail.jsx";

import ClinicList from "./components/clinic/ClinicList";
import ClinicForm from "./components/clinic/ClinicForm";
import ClinicDetail from "./components/clinic/ClinicDetail";

import AUTH_API from "api/AuthAPI";
import Store from "store";

class Goorm extends Component {
  render() {
    return (
      <Router>
        <MenuAppbar />

        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/product" component={ProductList} />
        <Route path="/product/new" component={ProductForm} />
        <Route
          path="/product/detail/:id"
          id="number"
          component={ProductDetail}
        />

        <Route exact path="/clinic" component={ClinicList} />
        <Route path="/clinic/new" component={ClinicForm} />
        <Route path="/clinic/detail/:id" id="number" component={ClinicDetail} />
      </Router>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this._onLogin = () => {
      this.setState({
        logged: true,
      });
    };
    this._onLogout = () => {
      this.setState({
        logged: false,
      });
    };
    this.state = {
      logged: false,
      onLogin: this._onLogin,
      onLogout: this._onLogout,
    };
  }

  componentDidMount = async () => {
    var token = window.sessionStorage.getItem("token");
    if (token != null) {
      this.setState({
        logged: true,
      });
    }

    await AUTH_API.getUsers()
      .then((result) => {
        console.log(result);
        window.sessionStorage.setItem("user_type", result.data.user_type);
      })
      .catch((err) => {
        console.log(err);
        this._onLogout();
      });
  };

  render() {
    return (
      <div className="main">
        <Store.Provider value={this.state}>
          <Goorm />
        </Store.Provider>
      </div>
    );
  }
}

export default App;
