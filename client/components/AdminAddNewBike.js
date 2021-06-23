import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addNewBike } from '../store/allProducts';

export default class AdminAddNewBike extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isAdmin } = this.props;
    // const { model, price, description } = this.state;
    // const { handleChange, handleSubmit } = this;
    return isAdmin ? (
      <div className="container">
        <div>
          <form
            className="edit-bike-form"
            //   onSubmit={}
          >
            <div className="field" tabIndex="1">
              <label htmlFor="model">
                <i aria-hidden="true"></i>Bike Model
              </label>
              <input
                name="model"
                // value={}
                // onChange={}
                type="text"
                placeholder="Bike Model"
                required
              />
            </div>
            <div className="field" tabIndex="2">
              <label htmlFor="price">
                <i></i>Price
              </label>
              <input
                name="price"
                // value={}
                // onChange={}
                type="text"
                placeholder="$"
                required
              />
            </div>
            <div className="field" tabIndex="3">
              <label htmlFor="description">
                <i></i>Description
              </label>
              <textarea
                name="description"
                // value={}
                // onChange={}
                placeholder="type here"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="file">Select Picture</label>
              <input type="file" name="file" />
            </div>
            <button type="submit" className="edit-btn">
              Add New Bike <i></i>
            </button>
          </form>
        </div>
      </div>
    ) : (
      <ErrorPage />
    );
  }
}
