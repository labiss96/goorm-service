import React from "react";
import Container from "@material-ui/core/Container";
import MenuAppbar from "./components/MenuAppBar.jsx";
import Main from "./components/Main";
import "./App.css";

function App() {
  return (
    <div className="main">
      <MenuAppbar />
      <Container maxWidth="lg">
        <Main />
      </Container>
    </div>
  );
}

export default App;
