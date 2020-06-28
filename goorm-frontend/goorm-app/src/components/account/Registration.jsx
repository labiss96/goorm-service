import React from "react";
import { Link, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import auth_api from "api/AuthAPI";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

class Registration extends React.Component {
  state = {
    username: "",
    password: "",
    repassword: "",
    email: "",
    userImg: "",
    is_successful: false,
  };

  handlingChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  checkPassword = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.password !== event.target.value) {
      event.target.error = true;
    }
  };

  handlingSubmit = async (event) => {
    event.preventDefault();
    await auth_api
      .authRegister({
        username: this.state.username,
        password: this.state.password,
      })
      .then((result) => {
        var user_data = result.data;
        this.doSignup(
          user_data.user.id,
          user_data.user.username,
          user_data.token
        );
        console.log(result);
        this.setState({
          username: "",
          password: "",
          repassword: "",
          email: "",
          is_successful: true,
        });
      })
      .catch((err) => console.log(err));
  };

  doSignup = (id, name, token) => {
    window.sessionStorage.setItem("id", id);
    window.sessionStorage.setItem("username", name);
    // window.sessionStorage.setItem("user_img", img);
    window.sessionStorage.setItem("token", token);
    console.log("token in session : ", window.sessionStorage.getItem("token"));
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        {this.state.is_successful ? <Redirect to="/login" /> : <></>}
        <Container maxWidth="xs" className="signup-container">
          <Paper className={classes.paper} elevation={0}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome to Goorm Service!
            </Typography>
            <form onSubmit={this.handlingSubmit} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="username"
                    name="username"
                    value={this.state.username}
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
                    name="password"
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handlingChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="repassword"
                    label="Confirm Password"
                    type="password"
                    value={this.state.repassword}
                    onChange={this.handlingChange}
                    error={
                      this.state.password === this.state.repassword
                        ? false
                        : true
                    }
                    helperText={
                      this.state.password === this.state.repassword
                        ? ""
                        : "incorrect!"
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <hr />
                  <Typography
                    component="h1"
                    variant="h5"
                    className={classes.center}
                  >
                    Additional Info
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
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
                Sign Up
              </Button>
            </form>
            <Link to="/">Cancel</Link>
          </Paper>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(Registration);
