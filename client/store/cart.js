// ACTION TYPES
const SET_CART = "SET_CART";

// ACTION CREATORS
export const setCart = (bikes) => ({
  type: SET_CART,
  bikes,
});

// THUNK CREATORS
export const fetchCart = (ids) => async (dispatch) => {
  try {
    // Pending API route
    console.log("Filter bikes FindAll with the following ids", ids);
  } catch (err) {
    console.log(err.stack);
  }
};

export const completeCheckout = (userId) => async (dispatch) => {};

// INITIAL STATE
const initialState = [];

// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return action.bikes;
    default:
      return state;
  }
};

export default cartReducer;
