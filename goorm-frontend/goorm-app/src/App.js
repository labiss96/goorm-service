import React from "react";
import Container from "@material-ui/core/Container";
import MenuAppbar from "./components/MenuAppBar.jsx";
import "./App.css";

function App() {
  return (
    <div className="main">
      <MenuAppbar />
      <Container maxWidth="lg">
        <p>Goorm Service</p>
      </Container>
    </div>
  );
}

export default App;
