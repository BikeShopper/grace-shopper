import Axios from 'axios';

// Action Types
const SET_SINGLE_BIKE = 'SET_SINGLE_BIKE';
const UPDATE_BIKE_INFO = 'UPDATE_BIKE_INFO';

// Action Creators
export const setSingleBike = (bike) => {
  return {
    type: SET_SINGLE_BIKE,
    bike,
  };
};
// ACTION CREATOR UPDATE BIKE
export const updateBike = (bike) => {
  return {
    type: UPDATE_BIKE_INFO,
    bike,
  };
};

// Thunk Creators
export const fetchSingleBike = (id) => {
  return async (dispatch) => {
    const { data } = await Axios.get(`/api/bikes/${id}`);
    dispatch(setSingleBike(data));
  };
};

//THUNK UPDATE BIKE
export const updateSingleBike = (id, bike) => async (dispatch) => {
  try {
    const { data: updatedBike } = await Axios.put(`/api/bikes/${id}`, bike);
    dispatch(updateBike(updatedBike));
  } catch (error) {
    console.error(error);
  }
};

// Initial State
const initialState = {};

// Reducer
export default function singleBikeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_BIKE:
      return action.bike;
    case UPDATE_BIKE_INFO:
      console.log('action bikde', action.bike);
      return action.bike;
    default:
      return state;
  }
}
