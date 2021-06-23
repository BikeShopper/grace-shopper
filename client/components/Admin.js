import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, deleteSingleUser } from '../store/adminUserStore';
import ErrorPage from './ErrorPage';

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.deleteButton = this.deleteButton.bind(this);
  }
  componentDidMount() {
    this.props.loadUsers();
  }

  deleteButton(event) {
    this.props.deleteUser(event.target.value);
  }

  render() {
    const { users, isAdmin } = this.props || [];
    return isAdmin ? (
      <div>
        ADMIN PAGE:
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <ul>
                <li>{user.username}</li>
                <button
                  value={user.id}
                  type="button"
                  onClick={this.deleteButton}
                >
                  Delete
                </button>
              </ul>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <ErrorPage />
    );
  }
}

const mapState = (state) => {
  return {
    users: state.adminUserReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
    deleteUser: (id) => dispatch(deleteSingleUser(id)),
  };
};

export default connect(mapState, mapDispatch)(Admin);
