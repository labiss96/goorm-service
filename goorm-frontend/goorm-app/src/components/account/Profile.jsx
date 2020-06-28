import React, { Component } from "react";
import AUTH_API from "../../api/AuthAPI";
import CertifyDialog from "./CertifyDialog";
// @material-ui
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default class Profile extends Component {
  state = {
    user_id: "",
    username: "",
    user_type: "",
    is_current_user: false,
  };

  componentDidMount() {
    // this.setState({userNow:window.sessionStorage.getItem("id")});
    // this.getUserData(this.props.username);
    console.log(window.sessionStorage.getItem("user_id"));
    this.getUserData();
  }

  getUserData = async () => {
    await AUTH_API.getUsers()
      .then((result) => {
        console.log("get userdata :", result);
        const userInfo = result.data;
        this.setState({
          user_id: userInfo.id,
          username: userInfo.username,
          user_type: userInfo.user_type,
        });

        if (window.sessionStorage.getItem("user_id") === String(userInfo.id)) {
          this.setState({ is_current_user: true });
          console.log(this.state.is_current_user);
        }
      })
      .catch((err) => console.log(err));
  };

  handlingChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  viewData = (key, value) => {
    return { key, value };
  };

  render() {
    const userData = [
      this.viewData("Username", this.state.username),
      this.viewData("User Type", this.state.user_type),
    ];

    return (
      <TableContainer>
        <Table
          style={{
            width: "100%",
            padding: 20,
            borderCollapse: "seperate",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h4">My Profile</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((col, index) => (
              <TableRow key={index} style={{ padding: 10 }}>
                <TableCell>{col.key}</TableCell>
                <TableCell>{col.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        {this.state.is_current_user ? (
          <>
            {this.state.user_type === "member" ? (
              <>already certified.</>
            ) : (
              <CertifyDialog />
            )}
          </>
        ) : (
          <></>
        )}
      </TableContainer>
    );
  }
}
