import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBikes } from "../store/allProducts";
import AddToCart from "./AddToCart";

export class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.UpdateCart = this.UpdateCart.bind(this);
  }

  componentDidMount() {
    const { localStorage } = window
    this.props.loadBikes();
  }

  UpdateCart(fullItem) {
    const { localStorage } = window;
    const cartHistory = JSON.parse(localStorage.getItem('cart')) || [];
    const totalHistory = JSON.parse(localStorage.getItem('total')) || 0;
    // Add conditional if localStorage cart includes the current fullItem.
    if (cartHistory.indexOf(fullItem) >= 0) {
      const idx = cartHistory.indexOf(fullItem)
      cartHistory[idx] = fullItem;
      localStorage.setItem('cart', JSON.stringify(cartHistory));
    } else {
      localStorage.setItem('cart', JSON.stringify([...cartHistory, fullItem]));
    }
    localStorage.setItem('total', (totalHistory + (fullItem.item.price * fullItem.counter)));
  };

  render() {
    const { bikes } = this.props || [];

    return (
      <div>
        <h1>All Bikes:</h1>
        <div>
          {bikes ? (
            <div>
              {bikes.map((bike) => (
                <div className="bike-container" key={bike.id}>
                  <Link to={`/bikes/${bike.id}`}>
                    <img src={bike.imageURL} />
                    <h3>{bike.model}</h3>
                  </Link>
                  <AddToCart bike={bike} UpdateCart={this.UpdateCart} />
                </div>
              ))}
            </div>
          ) : (
            <div>There are no bikes for sale yet</div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    bikes: state.bikesReducer,
  };
};
const mapDispatch = (dispatch) => {
  return {
    loadBikes: () => dispatch(fetchBikes()),
  };
};
export default connect(mapState, mapDispatch)(AllProducts);
