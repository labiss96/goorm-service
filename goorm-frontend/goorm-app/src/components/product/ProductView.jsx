import React, { Component } from "react";
import { Link } from "react-router-dom";
import PRODUCT_API from "api/ProductAPI";
import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { Divider } from "@material-ui/core";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
});

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand_name: "",
    };
  }
  componentDidMount = () => {
    this.getBrand();
  };

  getBrand = async () => {
    await PRODUCT_API.getBrand(this.props.productInfo.brand)
      .then((result) => {
        this.setState({
          brand_name: result.data.name,
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { classes } = this.props;
    const { productInfo } = this.props;
    var product_name = `${this.state.brand_name} ${productInfo.name}`;

    return (
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItem
          button
          component={Link}
          to={`/product/detail/${productInfo.id}`}
        >
          <ListItemAvatar>
            <SmokingRoomsIcon />
          </ListItemAvatar>
          <ListItemText
            primary={product_name}
            secondary={`${productInfo.price} won`}
          />
          <ListItemSecondaryAction></ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" />
      </List>
    );
  }
}

export default withStyles(useStyles)(ProductView);
