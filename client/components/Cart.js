// Cart Model belongsTo User
// It stores an array of integers (Bike.id)
// We have an API call that filters a FindAll with the array elements.

// PENDING: Figure out the item qty

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

class Cart extends Component {
    componentDidMount() {
        const { loadCart } = this.props;
        // Hardcoding the array for testing purposes.
        loadCart([1,7,3,5]);
    }

    render () {
        const cart = this.props.cart || []
        return (
            <div id="cart-container">
                <nav>
                    <h2>Cart</h2>
                </nav>
                <section id="cart">
                    {
                    cart[0] 
                    ? <p>There are items in the cart</p>
                    : <p>The cart is empty</p>
                    }
                </section>
            </div>
        );
    }
}

const mapState = state => ({
    cart: state.cartReducer
});

const mapDispatch = dispatch => ({
    loadCart: (ids) => dispatch(fetchCart(ids)),
});

export default connect(mapState, mapDispatch)(Cart);