import React from "react";
import history from "../history";
import { connect } from "react-redux";
import { fulfillCart } from "../store/cart";

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      creditCard: "",
      expiration: "",
      ccv: "",
    };

    this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.userId) {
      this.props.completeCheckout(this.props.userId);
    } else {
      localStorage.clear();
    }
    history.push("/confirmation");
  }

  render() {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <label>First Name</label>
        <input
          className="input"
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={(e) => this.handleInput(e)}
        ></input>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          alue={this.state.lastName}
          onChange={(e) => this.handleInput(e)}
        ></input>
        <label>Address</label>
        <input
          type="text"
          name="address"
          alue={this.state.address}
          onChange={(e) => this.handleInput(e)}
        ></input>
        <label>Credit Cart</label>
        <input
          type="text"
          name="creditCart"
          alue={this.state.creditCart}
          onChange={(e) => this.handleInput(e)}
        ></input>
        <label>Expiration</label>
        <input
          type="text"
          name="expiration"
          alue={this.state.expiration}
          onChange={(e) => this.handleInput(e)}
        ></input>
        <label>CCV</label>
        <input
          type="text"
          name="ccv"
          alue={this.state.ccv}
          onChange={(e) => this.handleInput(e)}
        ></input>
        <button
          className="button is-primary"
          onClick={(e) => {
            this.handleSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    completeCheckout: (userId) => dispatch(fulfillCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
