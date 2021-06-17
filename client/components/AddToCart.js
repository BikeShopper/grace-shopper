// The button shall make a POST request to the User Cart
// PENDING: Check why, after onClick, componentDidUpdate runs multiple times
import React, { Component } from 'react';

export default class AddToCart extends Component {
    constructor() {
        super();
        this.state = {
            item: {},
            counter: 0,
        }
        this.AddToCart = this.AddToCart.bind(this);
    }

    AddToCart( bike ) {
        // Set data to localState, individual for each item.
        this.setState((state) => {
            return {
                item: bike,
                counter: state.counter + 1,
            };
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { UpdateCart } = prevProps;
        console.log("Local Cart Btn State", this.state);
        if (this.state !== prevState) {
            UpdateCart(this.state);
        }
    }

    render() {
        const { bike } = this.props;
        return (
            <div className="add-to-cart">
                <button
                type="button"
                onClick={() => this.AddToCart(bike)}
                >
                ADD TO CART
                </button>
            </div>
        )
    }
}