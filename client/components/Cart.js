// Cart Model belongsTo User
// It stores an array of integers (Bike.id)
// We have an API call that filters a FindAll with the array elements.

// PENDING: Figure out the item qty

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { fetchBikes } from "../store/allProducts";
import axios from "axios";

class Cart extends Component {
  constructor() {
    super();
    this.state = {};
    this.getQuantity = this.getQuantity.bind(this);
  }

  componentDidMount() {
    this.props.loadBikes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart.length !== prevProps.cart.length) {
      this.props.loadCart(this.props.userId);
      this.getQuantity();
    }
  }

  async getQuantity() {

    const { data: bikeQty } = await axios.get(
      `/api/userCart/bikeQty/${this.props.userId}`
    );
    bikeQty.forEach((bike) => {
      this.setState({
        [bike.bikeId]: bike.quantity,
      });
    });
  }

  render() {
    const { cart, bikes } = this.props || [];
    let cartBikes = []
    cart.forEach(item => {
        for (const bike of bikes) {
            if (bike.id === item.bikeId) {
                cartBikes.push({item: bike, bikeQty: item.bikeQty})
            }
        }
    })

    const bikeIds = []
    cart.forEach(item => bikeIds.push(item.bikeId))

    console.log("Bike IDS", bikeIds)

    return (
      <div id="cart-container">
        <nav>
          <h2>Your Cart</h2>
        </nav>
        <section id="cart">
          {(cart[0]) ? (
            cartBikes.map((bike) => {
              return (
                <div className="bike-container" key={bike.item.id}>
                  <div>
                    <img src={bike.item.imageURL} />
                    <h3>{bike.item.model}</h3>
                    <p>Quantity: {bike.bikeQty}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>The cart is empty</p>
          )}
        </section>
      </div>
    );
  }
}

const mapState = (state) => ({
  bikes: state.bikesReducer,
  userId: state.auth.id,
  cart: state.cartReducer,
});

const mapDispatch = (dispatch) => ({
  loadBikes: () => dispatch(fetchBikes()),
  loadCart: (ids) => dispatch(fetchCart(ids)),
});

export default connect(mapState, mapDispatch)(Cart);
