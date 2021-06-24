import axios from "axios";

// ACTION TYPES

const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_CART = "UPDATE_CART";

// ACTION CREATORS
export const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  item,
});

export const updateCart = (bikeId) => ({
  type: UPDATE_CART,
  bikeId,
});

// THUNK CREATORS
export const fetchCart = (id) => async (dispatch) => {
  console.log(true);
  try {
    const { data: cart } = await axios.get(`/api/userCart/${id}`);
    dispatch(setCart(cart));
  } catch (err) {
    console.log(err.stack);
  }
};

export const addingToCart = (item) => async (dispatch) => {
  try {
    const { data: createdItem } = await axios.post("/api/userCart", item);
    console.log("AXIOS POST return", createdItem);
    dispatch(addToCart(createdItem));
  } catch (err) {
    console.log(err.stack);
  }
};

export const updatingCart = (id, item) => async (dispatch) => {
  try {
    const { data: updatedItem } = await axios.put(`/api/userCart/${id}`, item);
    const bikeId = updatedItem[1][0].bikeId;
    dispatch(updateCart(bikeId));
  } catch (err) {
    console.log(err.stack);
  }
};

// INITIAL STATE
const initialState = [];

// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.item];
    case UPDATE_CART:
      console.log("State on Update", state)
      const updatedCart = state.filter(item => 
        item.bikeId === action.bikeId
        ? {bikeId: item.bikeId, bikeQty: item.bikeQty + 1 }
        : item
      )
      return updatedCart;
    default:
      return state;
  }
};

export default cartReducer;
