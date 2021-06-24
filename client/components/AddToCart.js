// The button shall make a POST request to the User Cart
// PENDING: Check why, after onClick, componentDidUpdate runs multiple times
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { styles } from '../../public/styles';

class AddToCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bike: {},
      qty: 0,
    };
    this.AddToCart = this.AddToCart.bind(this);
  }


  AddToCart(bike) {
    // Set data to localState, individual for each item.
    this.setState((state) => {
      return {
        bike,
        qty: this.props.bikeQty + 1,
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
    const { bike, classes } = this.props;
    return (
      <div className="add-to-cart">
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          type="button"
          onClick={() => this.AddToCart(bike)}
        >
          ADD
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(AddToCart);
