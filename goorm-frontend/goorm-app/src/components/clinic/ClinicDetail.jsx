import React, { Component } from "react";
import { Link } from "react-router-dom";
import CLINIC_API from "api/ClinicAPI";

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

class ClinicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      contents: "",
      provider: "",
      amount: 0,
      url: "",
    };
  }
  componentDidMount = () => {
    this.getClinic();
  };

  getClinic = async () => {
    await CLINIC_API.getClinic(this.props.match.params.id)
      .then((result) => {
        console.log(result);
        var clinic_data = result.data;

        this.setState({
          id: clinic_data.id,
          title: clinic_data.title,
          contents: clinic_data.contents,
          provider: clinic_data.provider,
          amount: clinic_data.amount,
          url: clinic_data.url,
        });
      })
      .catch((err) => console.log(err));
  };

  deleteClinic = async () => {
    await CLINIC_API.deleteClinic(this.props.match.params.id)
      .then((result) => {
        console.log(result);
        this.props.history.push("/clinic");
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
                  {this.state.title}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="post-body">
                <Typography color="textSecondary" component="pre">
                  <p>- 제공기관 : {this.state.provider}</p>
                  <p>- 금액 : {this.state.amount}</p>
                  <p>- 서비스 내용</p>
                  <p>{this.state.contents}</p>
                  <hr />
                  <p>
                    * URL link : <a href={this.state.url}>{this.state.url}</a>
                  </p>
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Button
                  color="primary"
                  size="small"
                  component={Link}
                  to="/clinic"
                >
                  Back
                </Button>
                <Button
                  color="secondary"
                  size="small"
                  onClick={this.deleteClinic}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );
  }
}

export default ClinicDetail;
