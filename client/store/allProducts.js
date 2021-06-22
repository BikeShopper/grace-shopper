import axios from 'axios';

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

//INITIAL STATE
const initialState = [];

// REDUCER
const bikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BIKES:
      return action.bikes;
    case DELETE_BIKE:
      return state.filter((bike) => bike.id !== action.bike.id);
    default:
      return state;
  }
};

export default bikesReducer;
