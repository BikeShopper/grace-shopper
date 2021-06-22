import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBikes } from "../store/allProducts";
import { fetchCart, addingToCart, updatingCart } from "../store/cart";
import AddToCart from "./AddToCart";

class AllProducts extends Component {
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
    if (this.props !== prevProps && this.props.userId && this.props.cart.length === 0) {
      const { userId, loadCart } = this.props;
      loadCart(userId);
    }
  }

  UpdateCart(cartItem, prevItem) {
    const { cart, addToCart, updateCart, userId } = this.props;
    const [cartId, cartItems] = cart;
    console.log("cart Content", cartId, cartItems);
    const storeItemIdx = cartItems.indexOf(prevItem);
    // Check if the item is already in the cart.
    // If it is, perform an update to the cart
    if (storeItemIdx >= 0) {
      // We need to pass down the userId, bikeId and qty
      // We receive the itemId and the qty in an obj
      const item = {
        bikeId: cartItem.bike.id,
        quantity: cartItem.quantity,
      };
      updateCart(userId, item);
    } else {
      // Otherwise, add it to the userCart.
      // It takes a quantity and a price
      const item = {
        bikeId: cartItem.bike.id,
        cartId,
        quantity: cartItem.quantity,
        price: cartItem.bike.price,
      }
      addToCart(item)
    }
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
    cart: state.cartReducer,
    userId: state.auth.id,
  };
};
const mapDispatch = (dispatch) => {
  return {
    loadBikes: () => dispatch(fetchBikes()),
    loadCart: (id) => dispatch(fetchCart(id)),
    addToCart: (item) => dispatch(addingToCart(item)),
    updateCart: (id, item) => dispatch(updatingCart(id, item)),
  };
};
export default connect(mapState, mapDispatch)(AllProducts);
