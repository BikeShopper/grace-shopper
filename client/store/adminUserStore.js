import axios from 'axios';

//ACTION TYPE
const SET_ALL_USERS = 'SET_ALL_USERS';
const DELETE_USER = 'DELETE_USER';
//ACTION CREATOR
export const setUsers = (users) => {
  return {
    type: SET_ALL_USERS,
    users,
  };
};
export const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};
// THUNK CREATOR
export const fetchUsers = () => async (dispatch) => {
  try {
    const { data: allUsers } = await axios.get('/api/users', {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    });
    dispatch(setUsers(allUsers));
  } catch (error) {
    console.error(error);
  }
};

//THUNK DELETE USER
export const deleteSingleUser = (id) => async (dispatch) => {
  try {
    const { data: user } = await axios.delete(`/api/users/${id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    });
    dispatch(deleteUser(user));
  } catch (error) {
    console.error(error);
  }
};

// INITIAL STATE
const initialState = [];

//ADMINUSERREDUCER
const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
};
export default adminUserReducer;
