//TYPE
const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"


//ACTION
const actionGetAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    products,
})




//THUNKS
export const thunkGetAllProducts = () => async (dispatch) => {
    const response = await fetch("/api/products", {
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(actionGetAllProducts(data))
        return data;
    }

    return "error";
}



//REDUCER

let initialState = {
    products: {},
    singleProduct: { seller: {}, productImages:[]},
    userProducts: {},
};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type){
        case GET_ALL_PRODUCTS:{
            newState = { ...state };
            action.products.Products.forEach(
                // console.log('action', action,
                //     'action.products', action.products,
                //     'action.products.Products', action.product.Products),
                //NOTE: STATE IS BEING FLATTENED BELOW, id to match the product.id
                (product) => (newState.products[product.id] = product)
            );
            return newState;
        }

        default:
            return state;
    }
}
