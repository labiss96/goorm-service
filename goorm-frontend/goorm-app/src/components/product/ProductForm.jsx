import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  Container,
  Paper,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import product_api from "api/ProductAPI";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

class ProductForm extends Component {
  state = {
    name: "",
    price: 0,
    nicotine: 0.0,
    tar: 0.0,
    throat_hit: "",
    isMenthol: false,
    brand: -1,
    brand_list: [],
    selectOpen: false,
  };

  componentDidMount = () => {
    this.getBrands();
  };

  getBrands = async () => {
    await product_api
      .getAllBrand()
      .then((result) => {
        console.log(result);
        this.setState({
          brand_list: result.data,
        });
      })
      .catch((err) => console.log(err));
  };

  handlingChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  createTobacco = async () => {
    // var product_data = {
    // };
    await product_api
      .createTobacco({
        name: this.state.name,
        price: this.state.price,
        nicotine: this.state.nicotine,
        tar: this.state.tar,
        throat_hit: this.state.throat_hit,
        isMenthol: this.state.isMenthol,
        brand: this.state.brand,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="xs">
        <Paper className={classes.paper} elevation={0}>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <form onSubmit={this.createTobacco} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  labelId="usertype-select-label"
                  id="usertype-controlled-open-select"
                  open={this.state.selectOpen}
                  onClose={(e) => this.setState({ selectOpen: false })}
                  name="brand"
                  onOpen={(e) => this.setState({ selectOpen: true })}
                  value={this.state.brand}
                  onChange={(e) => this.setState({ brand: e.target.value })}
                >
                  <MenuItem value={-1}>Select Brand</MenuItem>
                  {this.state.brand_list.map((brd) => (
                    <MenuItem key={brd.id} value={brd.id}>
                      {brd.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  name="name"
                  label="product name"
                  value={this.state.name}
                  onChange={this.handlingChange}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="price"
                  label="price"
                  type="number"
                  value={this.state.price}
                  onChange={this.handlingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="nicotine"
                  label="nicotine"
                  type="number"
                  step="0.1"
                  value={this.state.nicotine}
                  onChange={this.handlingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="tar"
                  label="TAR"
                  type="number"
                  step="0.1"
                  value={this.state.tar}
                  onChange={this.handlingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="throat_hit"
                  label="throat hit"
                  value={this.state.throat_hit}
                  onChange={this.handlingChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ADD
            </Button>
          </form>
          <Link to="/product">Cancel</Link>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(useStyles)(ProductForm);
