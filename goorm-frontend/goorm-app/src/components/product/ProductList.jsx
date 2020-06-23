import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import product_api from "api/ProductAPI";

class ProductList extends Component {
  state = {
    tobacco_list: [],
  };
  componentDidMount = () => {
    this.getAllTobacco();
  };
  getAllTobacco = async () => {
    await product_api
      .getAllTobacco()
      .then((result) => {
        console.log(result);
        this.setState({
          tobacco_list: result.data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Link to="/product/new">Add product</Link>
        <hr />
        {this.state.tobacco_list.map((tobacco) => JSON.stringify(tobacco))}
      </Container>
    );
  }
}

export default ProductList;
