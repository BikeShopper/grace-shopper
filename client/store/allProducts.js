import axios from 'axios';

// ACTIONS TYPE
const SET_BIKES = 'SET_BIKES';

// ACTION CREATORS
export const setBikes = (bikes) => {
  return {
    type: SET_BIKES,
    bikes,
  };
};

//THUNK CREATORS
export const fetchBikes = () => async (dispatch) => {
    try {
        const {data: allBikes} = await axios.get('/api/bikes');
        dispatch(setBikes(allBikes))
    } catch (error) {
        console.error(error);
    }
};

//INITIAL STATE
const initialState = {
  bikes: [],
};

// REDUCER
const bikesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BIKES:
            return {...state, bikes: action.bikes};
        default:
            return state;
    }
}


export default bikesReducer;
