import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
} from "@material-ui/core";
import { withStyles, Typography, Button } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 140,
  },
});

class ClinicView extends Component {
  render() {
    const { classes } = this.props;
    const { clinicInfo } = this.props;
    return (
      <Card className={classes.root}>
        <CardActionArea component={Link} to={`/clinic/detail/${clinicInfo.id}`}>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Group image"
            image="https://blueviolin2046.files.wordpress.com/2016/05/r750x0.png?w=584"
            title="Group image"
          />
          <CardContent style={{ height: "150px" }}>
            <Typography gutterBottom variant="h5">
              {clinicInfo.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{
                display: "block",
                height: "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {clinicInfo.contents}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" disabled>
            @KMU-SW
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(useStyles)(ClinicView);
