

//TYPE----------------------------------------------------------------------------------------------//
const GET_CURRENT_CART = "carts/GET_CURRENT_CART"
const GET_PAST_CART = "carts/GET_PAST_CART"
const DELETE_CURRENT_CART_ITEM = "carts/DELETE_CURRENT_CART_ITEM"
const POST_ITEM_IN_CART = "carts/POST_ITEM_IN_CART"

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

// const actionPostItemInCart = (productId, cart_quantity) => ({
//     type: POST_ITEM_IN_CART,
//     productId,
//     cart_quantity,
// })

const actionPostItemInCart = (response) => ({
    type: POST_ITEM_IN_CART,
    response,
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

export const thunkPostItemToCart = (productId, cart_quantity) => async (dispatch) => {
    try{
        let response = await fetch(`/api/products/${productId}/to_cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart_quantity,
            }),
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
        //     const productPayLoad = action.response;
        //     console.log('WAHT IS THE PRODUCTPAYLOAD, GRAB CART ITEM', productPayLoad)
        //     newState.currentCart = { ...newState.currentCart }
        //     newState.currentCart[productPayLoad.productId.CurrentCart.productId] = {
        //         Product: productPayLoad.Product,
        //         ...productPayLoad.data.item_data
        //     }
        //     return newState;
        // }
        // case POST_ITEM_IN_CART: {
        //     newState = { ...state };
        //     const productPayLoad = action.response;
        //     console.log('WAHT IS THE PRODUCTPAYLOAD, GRAB CART ITEM', productPayLoad)
        //     newState.currentCart = {
        //         ...newState.currentCart,
        //         [productPayLoad.CurrentCart[0].productId]: {
        //             ...productPayLoad.CurrentCart[0],
        //             Product: productPayLoad.currentCart[0].Product
        //         }
        //     }
        //     return newState;
        // }
        case POST_ITEM_IN_CART: {
            newState = { ...state };
            const productPayload = action.response;

            if (productPayload && productPayload.CurrentCart && productPayload.CurrentCart.length > 0) {
                const cartItem = productPayload.CurrentCart[0];
                newState.currentCart = {
                    ...newState.currentCart,
                    [cartItem.productId]: {
                        ...cartItem,
                        Product: cartItem.Product,
                    },
                };
            }

            return newState;
        }
        default:
            return state
    }
}
