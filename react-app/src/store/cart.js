

//TYPE----------------------------------------------------------------------------------------------//
const GET_CURRENT_CART = "carts/GET_CURRENT_CART"
const GET_PAST_CART = "carts/GET_PAST_CART"
const DELETE_CURRENT_CART_ITEM = "carts/DELETE_CURRENT_CART_ITEM"

//ACTION----------------------------------------------------------------------------------------------//
const actionGetCurrentCart = (cart) => ({
    type: GET_CURRENT_CART,
    cart,
})

const actionGetPastCart = (cart) => ({
    type: GET_PAST_CART,
    cart,
})

const actionDeleteCurrentCartItem = (productId) => ({
    type: DELETE_CURRENT_CART_ITEM,
    productId
})

//THUNK----------------------------------------------------------------------------------------------//
export const thunkGetCurrentCart = () => async (dispatch) => {
    let current_cart = await fetch('/api/carts/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    current_cart = await current_cart.json();
    dispatch(actionGetCurrentCart(current_cart));
    return current_cart;
}

export const thunkGetPastCart = () => async (dispatch) => {
    let past_cart = await fetch('/api/carts/history', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    past_cart = await past_cart.json();
    dispatch(actionGetPastCart(past_cart));
    return past_cart;
}

export const thunkDeleteCurrentCartItem = (productId) => async (dispatch) => {
    let cartItem = await fetch(`/api/carts/${productId}`, {
        method: "DELETE",
    });
    cartItem = await cartItem.json();
    await dispatch(actionDeleteCurrentCartItem(cartItem))
    return cartItem;
}

//REDUCER----------------------------------------------------------------------------------------------//
let initialState = { currentCart: {}, pastCart: {}}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_CURRENT_CART: {
            newState = { ...state };
            newState.currentCart = {}
            action.cart.CurrentCart.forEach(
                (product) => (newState.currentCart[product.id] = { ...product })
            );
            return newState;
        }
        case GET_PAST_CART: {
            newState = { ...state };
            newState.pastCart = {}
            action.cart.PastCart.forEach(
                (product) => (newState.pastCart[product.id] = { ...product })
            );
            return newState;
        }
        case DELETE_CURRENT_CART_ITEM: {
            newState = { ...state };
            newState.currentCart = { ...newState.currentCart };
            delete newState.currentCart[action.cartItemId];
            return newState;
        }
        default:
            return state
    }
}
