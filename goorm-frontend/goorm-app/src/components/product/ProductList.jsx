import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import product_api from "api/ProductAPI";
import ProductView from "./ProductView";
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
  // JSON.stringify(tobacco);
  render() {
    return (
      <Container maxWidth="lg">
        <br />
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/product/new"
        >
          Add product
        </Button>
        <hr />
        {this.state.tobacco_list.map((tobacco, index) => (
          <ProductView key={index} productInfo={tobacco} />
        ))}
      </Container>
    );
  }
}

export default ProductList;
