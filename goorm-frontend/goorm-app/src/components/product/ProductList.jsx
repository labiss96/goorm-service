import React, { Component } from "react";
import { Button } from "@material-ui/core";
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
      <div>
        <Button onClick={this.getUserList}>Add product</Button>
        <hr />
        {this.state.tobacco_list.map((tobacco) => JSON.stringify(tobacco))}
      </div>
    );
  }
}

export default ProductList;
