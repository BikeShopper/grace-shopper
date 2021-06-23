import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { me } from "./store";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import AdminEditBike from "./components/AdminEditBike";
import AdminAddNewBike from "./components/AdminAddNewBike";
import Confirmation from "./components/Confirmation";
import Checkout from "./components/Checkout";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin, userId } = this.props;
    return (
      <div>
        {
          <Switch>
            <Route
              exact
              path="/admin"
              render={() => <Admin isAdmin={isAdmin} />}
            />
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Login} />
            <Route exact path="/login" exact component={Login} />
            <Route exact path="/signup" exact component={Signup} />
            <Route
              exact
              path="/add"
              render={(routeProps) => (
                <AdminAddNewBike isAdmin={isAdmin} {...routeProps} />
              )}
            />
            <Route
              exact
              path="/bikes"
              render={(routeProps) => (
                <AllProducts isAdmin={isAdmin} {...routeProps} />
              )}
            />
            <Route
              exact
              path="/bikes/:bikeId/edit"
              render={(routeProps) => (
                <AdminEditBike isAdmin={isAdmin} {...routeProps} />
              )}
            />
            <Route exact path="/bikes/:bikeId" component={SingleProduct} />
            {/*It may be necessary to add the userId to the cart Route*/}
            <Route exact path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/confirmation" component={Confirmation} />
          </Switch>
        }
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
