

//TYPE----------------------------------------------------------------------------------------------//
const GET_CURRENT_CART = "carts/GET_CURRENT_CART"
const GET_PAST_CART = "carts/GET_PAST_CART"
const DELETE_CURRENT_CART_ITEM = "carts/DELETE_CURRENT_CART_ITEM"
const POST_ITEM_IN_CART = "carts/POST_ITEM_IN_CART"
const UPDATE_ITEM_QUANTITY_AND_PURCHASE = "carts/UPDATE_ITEM_QUANTITY_AND_PURCHASE"
const CHECKOUT_CART = "carts/CHECKOUT_CART"

//ACTION----------------------------------------------------------------------------------------------//
const actionGetCurrentCart = (cart) => ({
    type: GET_CURRENT_CART,
    cart,
})

const actionGetPastCart = (cart) => ({
    type: GET_PAST_CART,
    cart,
})

const actionDeleteCurrentCartItem = (productId, data) => ({
    type: DELETE_CURRENT_CART_ITEM,
    productId,
    data
})

const actionPostItemInCart = (response) => ({
    type: POST_ITEM_IN_CART,
    response,
})

export const actionUpdateItemQuantityAndPurchase = (response) => ({
    type: UPDATE_ITEM_QUANTITY_AND_PURCHASE,
    response,
})

export const actionCheckoutCart = () => ({
    type: CHECKOUT_CART,

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
    let response = await fetch(`/api/carts/${productId}`, {
        method: "DELETE",
    });

    if(response.ok){
        const data = await response.json();
        // console.log('what is data here', data)
        dispatch(actionDeleteCurrentCartItem(productId, data));
        return data
    }

    return "Product could not be deleted from cart"
}

export const thunkPostItemToCart = (productId) => async (dispatch) => {
    try{
        let response = await fetch(`/api/products/${productId}/to_cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

        });


        if (response.ok){
            const data = await response.json();
            dispatch(actionPostItemInCart(data));
            return data
        } else {
            const errorResponse = await response.json();
            return errorResponse
        }

    } catch (e) {
        return { error: e.message };
    }

}

export const thunkUpdateItemQuantityAndPurchase = (id, cart_quantity, purchased) => async (dispatch) => {
    try{
        // console.log("we hit before? and what is cartId", cartId)
        let response = await fetch(`/api/carts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                cart_quantity,
                purchased,
            ),
        });


        if (response.ok){
            const data = await response.json();
            dispatch(actionUpdateItemQuantityAndPurchase(data));
            return data
        } else {
            const errorResponse = await response.json();
            return errorResponse
        }

    } catch (e) {
        return { error: e.message };
    }

}

export const thunkCheckoutCart = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/carts/checkout`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            dispatch(actionCheckoutCart(response));
        } else {
            const errorResponse = await response.json();
            return errorResponse;
        }
    } catch (e) {
        return { error: e.message }
    }
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
            // console.log('what is this?', action.productId, action.product, action.cart)

            delete newState.currentCart[action.data.item_data.id];
            return newState;
        }

        // case POST_ITEM_IN_CART: {
        //     newState = { ...state };
        //     const productPayload = action.response;
        //     // console.log('what is this', productPayload.CurrentCart)

        //     if (productPayload && productPayload.CurrentCart && productPayload.CurrentCart.length > 0) {
        //         const cartItem = productPayload.CurrentCart[0];
        //         newState.currentCart = {
        //             ...newState.currentCart,
        //             [cartItem.productId]: {
        //                 ...cartItem,
        //                 Product: cartItem.Product,
        //             },
        //         };
        //     }

        //     return newState;
        // }
        case POST_ITEM_IN_CART: {
            newState = { ...state };
            const productPayload = action.response;
            // console.log('what is this', productPayload.CurrentCart)

            const cartItem = productPayload.CurrentCart[0];
            newState.currentCart = {
                ...newState.currentCart,
                [cartItem.productId]: {
                    ...cartItem,
                    Product: cartItem.Product,
                },
            };
            return newState;
        }
        // case UPDATE_ITEM_QUANTITY_AND_PURCHASE: {
        //     newState = { ...state };
        //     const productPayload = action.response;
        //     newState.currentCart = { ...newState.currentCart };

        //     console.log('Product Payload:', productPayload);


        //     const cartItem = productPayload;
        //     console.log('Processing Cart Item:', cartItem);

        //     newState.currentCart[cartItem.productId] = {
        //         [cartItem.id]: {
        //             ...cartItem,
        //             Product: cartItem.Product,
        //         },
        //     };


        //     console.log('New State:', newState);

        //     return newState;
        // }
        //ORIGINAL BELOW
        case UPDATE_ITEM_QUANTITY_AND_PURCHASE: {
            newState = { ...state };

            const productPayload = action.response;
            console.log('Product Payload:', productPayload);

            newState.currentCart = { ...newState.currentCart };

            const cartItem = productPayload.CurrentCart; // Assuming CurrentCart is an array
            console.log('Processing productPayload cart quantity:', productPayload.cart_quantity);

            console.log('what is cartItem.id', cartItem.id)
            newState.currentCart[cartItem.id] = {
                ...newState.currentCart[cartItem.id],
                cart_quantity: cartItem.cart_quantity,
                purchased: cartItem.purchased,
                Product: cartItem.Product,
            };


            console.log('New State:', newState);

            return newState;
        }
        case CHECKOUT_CART: {
            newState = { ...state };
            newState.currentCart = {};
            return newState;
        }


        default:
            return state
    }

}
