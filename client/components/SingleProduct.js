import React from "react";
import { connect } from "react-redux";
import { fetchSingleBike } from "../store/singleProduct";

export class SingleProduct extends React.Component {
  render() {
    const bike = this.props.bike;
    return (
      <div>
        <h1>{bike.model}</h1>
        <img src={bike.imageUrl} />
        <h2>{bike.year}</h2>
        <p>{bike.description}</p>
        <h1>{bike.price}</h1>
      </div>
    );
  }
}

const mapState = (state) => {
  return { bike: state.bike };
};

const mapDispatch = (dispatch) => {
  return {
    loadBike: (id) => dispatch(fetchSingleBike(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
