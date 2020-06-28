import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CLINIC_API from "api/ClinicAPI";

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

class ClinicForm extends Component {
  state = {
    title: "",
    contents: "",
    provider: "",
    amount: 0,
    url: "",
    is_successful: false,
  };

  handlingChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  createClinic = async (event) => {
    event.preventDefault();
    if (this.state.throat_hit === "" || this.state.brand === -1) {
      alert("모든 항목을 채워주세요");
    } else {
      await CLINIC_API.createClinic({
        title: this.state.title,
        contents: this.state.contents,
        provider: this.state.provider,
        amount: this.state.amount,
        url: this.state.url,
      })
        .then((result) => {
          console.log(result);
          this.setState({
            is_successful: true,
          });
          alert("성공적으로 제품이 추가되었습니다.");
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.is_successful ? <Redirect to="/clinic" /> : <></>}

        <Container maxWidth="xs">
          <Paper className={classes.paper} elevation={0}>
            <Typography component="h1" variant="h5">
              Clinic Service 등록
            </Typography>
            <form
              onSubmit={(e) => this.createClinic(e)}
              className={classes.form}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    label="클리닉 서비스 명"
                    value={this.state.title}
                    onChange={this.handlingChange}
                    required
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    name="contents"
                    label="서비스 내용"
                    value={this.state.contents}
                    onChange={this.handlingChange}
                    multiline
                    rows={4}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="provider"
                    label="제공기관"
                    value={this.state.provider}
                    onChange={this.handlingChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="amount"
                    label="금액"
                    type="number"
                    value={this.state.amount}
                    onChange={this.handlingChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="url"
                    label="URL"
                    value={this.state.url}
                    onChange={this.handlingChange}
                    required
                    fullWidth
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
      </>
    );
  }
}

export default withStyles(useStyles)(ClinicForm);
