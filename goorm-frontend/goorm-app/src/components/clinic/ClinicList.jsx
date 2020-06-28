import React, { Component } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CLINIC_API from "api/ClinicAPI";
import ClinicView from "./ClinicView";

class ClinicList extends Component {
  state = {
    clinic_list: [],
  };
  componentDidMount = () => {
    this.getAllClinic();
  };
  getAllClinic = async () => {
    await CLINIC_API.getAllClinic()
      .then((result) => {
        console.log(result);
        this.setState({
          clinic_list: result.data,
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
          to="/clinic/new"
        >
          Add Clinic Service
        </Button>
        <hr />
        <br />
        <Grid container spacing={2}>
          {this.state.clinic_list.map((clinic, index) => (
            <Grid item xs={6} sm={3}>
              <ClinicView key={index} clinicInfo={clinic} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default ClinicList;
