import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorPage from './ErrorPage';
import { createSingleBike } from '../store/allProducts';

export class AdminAddNewBike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: '',
      price: '',
      description: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.model && this.state.price && this.state.description) {
      this.props.createBike(this.state);
      this.setState({
        model: '',
        price: '',
        description: '',
      });
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { isAdmin } = this.props;
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
                // required
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
                // required
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
                // required
              ></textarea>
            </div>
            <div>
              <label htmlFor="file">Select Picture</label>
              <input type="file" name="file" />
            </div>
            <div>
              <button type="submit" className="add-btn">
                Add New Bike <i></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : (
      <ErrorPage />
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    createBike: (bike) => dispatch(createSingleBike(bike)),
  };
};
export default connect(null, mapDispatch)(AdminAddNewBike);
