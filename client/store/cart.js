import axios from "axios";

// ACTION TYPES
const SET_CART =  "SET_CART";

// ACTION CREATORS
export const setCart = cart => ({
    type: SET_CART,
    cart,
});

// THUNK CREATORS
export const fetchCart = id => async dispatch => {
    try {
        const { data: cart } = await axios.get(`/api/userCart/${id}`);
        console.log("Data from API call", cart)
        dispatch(setCart(cart));
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
        default:
            return state;
    };
};

export default cartReducer;