import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MenuAppbar from "./components/MenuAppBar.jsx";
import Main from "./components/Main";
import Login from "./components/Login";
import "./App.css";

import AuthProvider from "./context/AuthProvider";

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <AuthProvider>
          <Router>
            <MenuAppbar />

            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
