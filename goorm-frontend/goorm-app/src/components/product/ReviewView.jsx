import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PRODUCT_API from "api/ProductAPI";
//@material-ui
import {
  Avatar,
  Typography,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@material-ui/core";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import SettingsIcon from "@material-ui/icons/Settings";

export default class ReviewView extends Component {
  state = {
    is_update: false,
    request_user: "",
  };

  UNSAFE_componentWillMount() {
    this.setState({
      request_user: window.sessionStorage.getItem("user_id"),
    });
  }

  handlingChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingDelete = async (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?") === true) {
      await PRODUCT_API.deleteReview(id);
      this.props.getProduct();
    }
  };

  flagChange = () => {
    this.setState({
      is_update: false,
    });
  };

  render() {
    const { review_info, id } = this.props;
    const pub_date = moment(review_info.pub_date).format("MM/DD hh:mm");
    return (
      <List component="nav" aria-label="contacts">
        <ListItem>
          <ListItemAvatar>
            <IconButton>
              <Avatar alt="comment-author" />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={review_info.contents}
            secondary={
              <>
                {review_info.writer.username}
                <Typography variant="caption">{pub_date}</Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            {review_info.writer ===
            Number(window.sessionStorage.getItem("user_id")) ? (
              <>
                <PopupState variant="popover" popupId="popup-menu">
                  {(popupState) => (
                    <>
                      <IconButton
                        style={{ color: "white" }}
                        {...bindTrigger(popupState)}
                      >
                        <SettingsIcon color="primary" />
                      </IconButton>
                      <Menu {...bindMenu(popupState)} style={{ padding: 10 }}>
                        <MenuItem
                          onClick={(e) => {
                            popupState.close();
                          }}
                          style={{ color: "blue" }}
                        >
                          수정
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            popupState.close();
                            this.handlingDelete(id);
                          }}
                          style={{ color: "red" }}
                        >
                          삭제
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </PopupState>
              </>
            ) : (
              <></>
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" />
      </List>
    );
  }
}
