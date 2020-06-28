import React, { Component } from "react";

import PRODUCT_API from "api/ProductAPI";

import {
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";

export default class ReviewForm extends Component {
  state = {
    user_id: "",
    content: "",
  };

  UNSAFE_componentWillMount() {
    this.setState({
      user_id: window.sessionStorage.getItem("user_id"),
    });
  }

  handlingChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async (event, product_id) => {
    event.preventDefault();

    await PRODUCT_API.createReview({
      contents: this.state.content,
      score: 3,
      tobacco: product_id,
      writer: this.state.user_id,
    })
      .then((result) => {
        console.log(result);
        this.setState({
          content: "",
        });
        this.props.getProduct();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10}>
            <List>
              <form
                onSubmit={(event) =>
                  this.handlingSubmit(event, this.props.product_id)
                }
                className="commentForm"
                style={{ width: "auto" }}
              >
                <ListItem
                  alignItems="flex-start"
                  style={{ verticalAlign: "middle" }}
                >
                  <ListItemAvatar style={{ paddingTop: 20 }}>
                    <Avatar alt="User image" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <TextField
                        label="comment"
                        name="content"
                        value={this.state.content || ""}
                        onChange={this.handlingChange}
                        margin="normal"
                        style={{ width: "100%" }}
                        required
                      />
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 30, marginLeft: 10 }}
                  >
                    작성
                  </Button>
                </ListItem>
              </form>
            </List>
          </Grid>
        </Grid>
      </>
    );
  }
}
