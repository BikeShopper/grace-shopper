import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorPage from './ErrorPage';
import { updateSingleBike, fetchSingleBike } from '../store/singleProduct';

export class AdminEditBike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: '',
      price: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const { bikeId } = this.props.match.params;
    this.props.loadBike(bikeId);
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        model: this.props.bike.model,
        price: this.props.bike.price,
        description: this.props.bike.description,
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateBike(this.props.bike.id, this.state);
  }

  render() {
    const { isAdmin, classes } = this.props;
    const { model, price, description } = this.state;
    const { handleChange, handleSubmit } = this;
    return isAdmin ? (
      <div className="container">
        <div>
          <form className="edit-bike-form" onSubmit={handleSubmit}>
            <div className="field" tabIndex="1">
              <label htmlFor="model">
                <i aria-hidden="true"></i>Bike Model
              </label>
              <input
                name="model"
                value={model}
                onChange={handleChange}
                type="text"
                placeholder="Bike Model"
              />
            </div>
            <div className="field" tabIndex="2">
              <label htmlFor="price">
                <i></i>Price
              </label>
              <input
                name="price"
                value={price}
                onChange={handleChange}
                type="text"
                placeholder="$"
              />
            </div>
            <div className="field" tabIndex="3">
              <label htmlFor="description">
                <i></i>Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="type here"
              ></textarea>
            </div>
            <div>
              <label htmlFor="file">Select Picture</label>
              <input type="file" name="file" />
            </div>
            <button type="submit" className="edit-btn">
              Edit Bike <i></i>
            </button>
          </form>
        </div>
      </div>
    ) : (
      <ErrorPage />
    );
  }
}

const mapState = (state) => {
  return {
    bike: state.singleBikeReducer,
  };
};
const mapDispatch = (dispatch) => {
  return {
    loadBike: (id) => dispatch(fetchSingleBike(id)),
    updateBike: (id, bike) => dispatch(updateSingleBike(id, bike)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapState, mapDispatch)
)(AdminEditBike);
