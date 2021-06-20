import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom';
import { fetchUsers } from '../store/adminStore';

export class Admin extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUsers();
  }
  render() {
    const { users } = this.props || [];
    return (
      <div>
        ADMIN PAGE:
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <ul>
                <li>{user.username}</li>
                <button>Edit</button>
                <button>Delete</button>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.adminReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(Admin);
