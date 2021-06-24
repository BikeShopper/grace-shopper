import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import useStyles from '../../public/styles';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const classes = useStyles();
  return (
    <div>
      <>
        <Typography variant="h4" align="center" color="textPrimary">
          <div className={classes.container}>BikeShopper</div>
        </Typography>
      </>
      <nav>
        {isLoggedIn ? (
          <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
              <div className={classes.container}>
                {/* The navbar will show these links after you log in */}

                <Link to="/home">
                  <HomeIcon className={classes.icon} />
                  Home
                </Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
                <Link to="/bikes">Bikes</Link>
                {isAdmin && <Link to="/admin">Users</Link>}
                <Link to="/cart">Cart</Link>
              </div>
            </AppBar>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CssBaseline />
            <div className={classes.container}>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/bikes">Bikes</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </React.Fragment>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
