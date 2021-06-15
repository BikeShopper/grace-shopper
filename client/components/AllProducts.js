import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default class AllProducts extends Component {
  render() {
    return (
      <div>
        <h1>All Bikes:</h1>
        <div>
          {bikes ? (
            <div>
              {bikes.map((bike) => (
                <div key={bike.id}>
                  <Link to={`/products/:${product.id}`}>
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
