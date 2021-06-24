// The button shall make a POST request to the User Cart
// PENDING: Check why, after onClick, componentDidUpdate runs multiple times
import React, { Component } from "react";
import { connect } from "react-redux";

export default class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bike: {},
      qty: props.bikeQty,
    };
    this.AddToCart = this.AddToCart.bind(this);
  }


  AddToCart(bike) {
    // Set data to localState, individual for each item.
    console.log("Check if quantity is passed", this.state.qty);
    this.setState((state) => {
      return {
        bike,
        qty: state.qty + 1,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { UpdateCart } = prevProps;
    if (this.state !== prevState) {
      // Pass the prevState for comparison in the Cart.
      UpdateCart(this.state, prevState);
    }
  }

  render() {
    const { bike } = this.props;
    return (
      <div className="add-to-cart">
        <button type="button" onClick={() => this.AddToCart(bike)}>
          ADD TO CART
        </button>
      </div>
    );
  }
}
