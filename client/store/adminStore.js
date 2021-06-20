import axios from 'axios';

//ACTION TYPE
const SET_ALL_USERS = 'SET_ALL_USERS';
//ACTION CREATOR
export const setUsers = (users) => {
  return {
    type: SET_ALL_USERS,
    users,
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
// INITIAL STATE
const initialState = [];

//ADMINREDUCER
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
};
export default adminReducer;
