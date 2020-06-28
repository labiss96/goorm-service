import React, { Component } from "react";
import { Link } from "react-router-dom";
import PRODUCT_API from "api/ProductAPI";
import ReviewView from "./ReviewView";
import ReviewForm from "./ReviewForm";
// @material-ui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@material-ui/core";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      brand: "",
      brand_name: "",
      id: "",
      is_menthol: "",
      name: "",
      nicotine: "",
      price: "",
      tar: "",
      throat_hit: "",
      reviews: [],
    };
  }
  componentDidMount = () => {
    this.getProduct();
    // this.getReviews();
  };

  getProduct = async () => {
    await PRODUCT_API.getTobacco(this.props.match.params.id)
      .then((result) => {
        console.log(result);
        var tobacco_data = result.data;

        this.setState({
          brand: tobacco_data.brand,
          id: tobacco_data.id,
          is_menthol: tobacco_data.is_menthol,
          name: tobacco_data.name,
          nicotine: tobacco_data.nicotine,
          price: tobacco_data.price,
          tar: tobacco_data.tar,
          throat_hit: tobacco_data.throat_hit,
          // reviews: tobacco_data.reviews,
        });
        this.getBrand(result.data.brand);
        this.getReviews(result.data.id);
      })
      .catch((err) => console.log(err));
  };

  callGetProduct = () => {
    this.getProduct();
  };

  getBrand = async (brand_id) => {
    await PRODUCT_API.getBrand(brand_id)
      .then((result) => {
        this.setState({
          brand_name: result.data.name,
        });
      })
      .catch((err) => console.log(err));
  };

  getReviews = async (tobacco_id) => {
    await PRODUCT_API.getReviews(tobacco_id)
      .then((result) => {
        console.log(result);
        this.setState({ reviews: result.data });
      })
      .catch((err) => console.log(err));
  };

  deleteProduct = async () => {
    await PRODUCT_API.deleteTobacco(this.props.match.params.id)
      .then((result) => {
        console.log(result);
        this.props.history.push("/product");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <Table className={"post-table"}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography component="h1" variant="h5">
                  {this.state.brand_name} {this.state.name}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="post-body">
                <Typography color="textSecondary" component="pre">
                  <p>Price : {this.state.price}</p>
                  <p>nicotine : {this.state.nicotine}</p>
                  <p>TAR : {this.state.tar}</p>
                  <p>
                    Menthol Type :{" "}
                    {this.state.is_menthol ? "Menthol" : "Non-Menthol"}
                  </p>
                  <p>Thoat hit : {this.state.throat_hit}</p>
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Button
                  color="primary"
                  size="small"
                  component={Link}
                  to="/product"
                >
                  Back
                </Button>
                <Button
                  color="secondary"
                  size="small"
                  onClick={this.deleteProduct}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {this.state.reviews.map((review, index) => (
          <ReviewView
            key={index}
            id={review.id}
            review_info={review}
            getProduct={this.callGetProduct}
          />
        ))}
        <ReviewForm
          product_id={this.props.match.params.id}
          getProduct={this.callGetProduct}
        />
      </>
    );
  }
}

export default ProductDetail;
