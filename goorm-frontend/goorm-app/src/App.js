import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MenuAppbar from "./components/MenuAppBar.jsx";
import Main from "./components/Main";
import Login from "./components/account/Login";
import Profile from "./components/account/Profile";
import Registration from "./components/account/Registration";
import ProductList from "./components/product/ProductList";
import ProductForm from "./components/product/ProductForm";
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

  componentDidMount = () => {
    if (window.sessionStorage.getItem("token") != null) {
      this.setState({
        logged: true,
      });
    }
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
