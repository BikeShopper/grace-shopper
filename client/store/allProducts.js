import axios from 'axios';
import history from '../history';

// ACTIONS TYPE
const SET_BIKES = 'SET_BIKES';
const DELETE_BIKE = 'DELETE_BIKE';
const CREATE_NEW_BIKE = 'CREATE_NEW_BIKE';

// ACTION CREATORS
export const setBikes = (bikes) => {
  return {
    type: SET_BIKES,
    bikes,
  };
};
export const deleteBike = (bike) => {
  return {
    type: DELETE_BIKE,
    bike,
  };
};
export const createBike = (bike) => {
  return {
    type: CREATE_NEW_BIKE,
    bike,
  };
};

//THUNK CREATORS
export const fetchBikes = () => async (dispatch) => {
  try {
    const { data: allBikes } = await axios.get('/api/bikes');
    dispatch(setBikes(allBikes));
  } catch (error) {
    console.error(error);
  }
};
// THUNK DELETE BIKE
export const deleteSingleBike = (id) => async (dispatch) => {
  try {
    const { data: bike } = await axios.delete(`/api/bikes/${id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    });
    dispatch(deleteBike(bike));
  } catch (error) {
    console.error(error);
  }
};
//THUNK CREATE BIKE
export const createSingleBike = (bike) => async (dispatch) => {
  try {
    const { data: createdBike } = await axios.post('/api/bikes', bike, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    });
    dispatch(createBike(createdBike));
    history.push('/bikes');
  } catch (error) {
    console.error(error);
  }
};

//INITIAL STATE
const initialState = [];

// REDUCER
const bikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BIKES:
      return action.bikes;
    case CREATE_NEW_BIKE:
      return [...state, action.bike];
    case DELETE_BIKE:
      return state.filter((bike) => bike.id !== action.bike.id);
    default:
      return state;
  }
};

export default bikesReducer;
