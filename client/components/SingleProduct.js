import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleBike } from '../store/singleProduct';

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.loadBike(this.props.match.params.bikeId);
  }
  render() {
    const bike = this.props.bike;
    return bike ? (
      <div className="bike-cr">
        <h1>{bike.model}</h1>
        <img src={bike.imageURL} />
        <h2>{bike.year}</h2>
        <p>{bike.description}</p>
        <h1>{bike.price}</h1>
      </div>
    ) : (
      <div>
        <h3>Loading bike...</h3>
      </div>
    );
  }
}

const mapState = (state) => {
  return { bike: state.singleBikeReducer };
};

const mapDispatch = (dispatch) => {
  return {
    loadBike: (id) => dispatch(fetchSingleBike(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
