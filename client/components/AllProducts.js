import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBikes } from '../store/allProducts';
import AddToCart from './AddToCart';
import { deleteSingleBike } from '../store/allProducts';

export class AllProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      total: 0,
    };
    this.UpdateCart = this.UpdateCart.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  componentDidMount() {
    this.props.loadBikes();
  }

  UpdateCart(fullItem) {
    this.setState((state) => {
      return {
        cart: [...state.cart, fullItem.item],
        total: state.total + fullItem.item.price * fullItem.counter,
      };
    });
  }

  deleteButton(event) {
    this.props.deleteBike(event.target.value);
  }

  render() {
    const { bikes, isAdmin } = this.props || [];
    return (
      <div>
        <h1>All Bikes:</h1>
        {isAdmin && <button>Add New Bike</button>}
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
                  {isAdmin && (
                    <div>
                      <button>Edit</button>
                      <button
                        value={bike.id}
                        type="button"
                        onClick={this.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  )}
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
    deleteBike: (id) => dispatch(deleteSingleBike(id)),
  };
};
export default connect(mapState, mapDispatch)(AllProducts);
