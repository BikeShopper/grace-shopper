import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBikes } from "../store/allProducts";
import AddToCart from "./AddToCart";

export class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      total: 0,
      itemQty: 0
    };
    this.UpdateCart = this.UpdateCart.bind(this);
  };

  componentDidMount() {
    this.props.loadBikes();
    if (!localStorage.cart) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      const { cart, total, itemQty } = this.state
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('total', JSON.stringify(total));
      localStorage.setItem('itemQty', JSON.stringify(itemQty));
    }
  }

  UpdateCart(cartItem, prevItem) {
    this.setState(state => {
      const itemIdx = state.cart.indexOf(prevItem);
      if (itemIdx >= 0) {
        const { cart } = this.state;
        cart[itemIdx] = cartItem;
        return {
          cart: cart,
          total: state.total + (cartItem.item.price * cartItem.qty),
          itemQty: state.itemQty + 1,
        }
      } else {
          return { 
            cart: [...state.cart, cartItem],
            total: state.total + (cartItem.item.price * cartItem.qty),
            itemQty: state.itemQty + 1,
          };
        }
    })
  };

  render() {
    const { bikes } = this.props || [];

    return (
      <div>
        <h1>All Bikes:</h1>
        <div>
          {bikes ? (
            <div>
              {bikes.map((bike) => {
                const cartItem = {
                  id: bike.id,
                  model: bike.model,
                  image: bike.imageURL,
                  price: bike.price,
                }
                return (
                  <div className="bike-container" key={bike.id}>
                    <Link to={`/bikes/${bike.id}`}>
                      <img src={bike.imageURL} />
                      <h3>{bike.model}</h3>
                    </Link>
                    <AddToCart bike={cartItem} UpdateCart={this.UpdateCart} />
                  </div>
                )
                })}
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
