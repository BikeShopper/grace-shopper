import axios from "axios";

// ACTION TYPES
const SET_CART =  "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_CART = "UPDATE_CART";

// ACTION CREATORS
export const setCart = cart => ({
    type: SET_CART,
    cart,
});

export const addToCart = item => ({
    type: ADD_TO_CART,
    item,
});

export const updateCart = item => ({
    type: UPDATE_CART,
    item,
});

// THUNK CREATORS
export const fetchCart = id => async dispatch => {
    try {
        const { data: cart } = await axios.get(`/api/userCart/${id}`);
        dispatch(setCart(cart));
    } catch (err) {
        console.log(err.stack);
    }
};

export const addingToCart = (item) => async dispatch => {
    try {
        const { data: createdItem } = await axios.post("/api/userCart", item);
        dispatch(addToCart(createdItem));
    } catch (err) {
        console.log(err.stack)
    }
}

export const updatingCart = (id, item) => async dispatch => {
    try {
        const { data: updatedItem } = await axios.put(`/api/userCart/${id}`, item);
        const bikeId = updatedItem[1][0].bikeId;
        //dispatch(updateCart(updatedItem));
    } catch (err) {
        console.log(err.stack)
    }
}

// INITIAL STATE
const initialState = [];

// REDUCER
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART:
            return action.cart;
        case ADD_TO_CART:
            const updatedItems = state.filter(item => 
                item.id !== action.item.id 
                ? item.id
                : action.item.id
                );
            return updatedItems;
        default:
            return state;
    };
};

export default cartReducer;