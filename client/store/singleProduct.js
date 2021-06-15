import Axios from "axios";

// Action Types
const SET_SINGLE_BIKE = "SET_SINGLE_BIKE";

// Action Creators
export const setSingleBike = (bike) => {
  return {
    type: SET_SINGLE_BIKE,
    bike,
  };
};

// Thunk Creators
export const fetchSingleBike = (id) => {
  return async (dispatch) => {
    const { data } = await Axios.get(`api/bikes/${id}`);
    dispatch(setSingleBike(data));
  };
};

// Initial State
const initialState = {};

// Reducer
export default function singleBikeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_BIKE:
      return action.bike;
    default:
      return state;
  }
}
