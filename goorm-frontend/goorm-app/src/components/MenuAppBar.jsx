import React from "react";
import { Link } from "react-router-dom";
import Store from "store";
import auth_api from "api/AuthAPI";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  MenuItem,
  Menu,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = async (event, onLogout) => {
    setAnchorEl(null);

    await auth_api
      .authLogout()
      .then((result) => {
        console.log(result);
        window.sessionStorage.clear();
        onLogout();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
            style={{
              textDecoration: "inherit",
              color: "inherit",
            }}
          >
            Goorm Service
          </Typography>
          <Store.Consumer>
            {(store) => (
              <>
                {store.logged ? (
                  <>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={(e) => logout(e, store.onLogout)}>
                        logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      color="inherit"
                      size="large"
                      component={Link}
                      to="/login"
                      style={{
                        textDecoration: "inherit",
                        color: "inherit",
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      color="inherit"
                      size="large"
                      component={Link}
                      to="/register"
                      style={{
                        textDecoration: "inherit",
                        color: "inherit",
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </>
            )}
          </Store.Consumer>
        </Toolbar>
      </AppBar>
    </div>
  );
}
