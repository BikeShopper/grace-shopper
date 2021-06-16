import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBikes } from '../store/allProducts';

export class AllProducts extends Component {
  constructor(props) {
    super(props);
    // this.state = {

    // }
  }

  componentDidMount() {
    this.props.loadBikes();
  }

  render() {
    const { bikes } = this.props || [];
    console.log('props', this.props);
    return (
      <div>
        <h1>All Bikes:</h1>
        <div>
          {bikes ? (
            <div>
              {bikes.map((bike) => (
                <div key={bike.id}>
                  <Link to={`/bikes/:${bike.id}`}>
                    <img src={bike.imageURL} />
                    <h3>{bike.model}</h3>
                  </Link>
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
