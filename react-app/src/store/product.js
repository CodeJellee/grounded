//TYPE----------------------------------------------------------------------------------------------//
const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"
const GET_EACH_PRODUCT = "products/GET_EACH_PRODUCT"



//ACTION----------------------------------------------------------------------------------------------//
const actionGetAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    products,
})

const actionGetSingleProduct = (product) => ({
    type: GET_EACH_PRODUCT,
    product,
})



//THUNKS----------------------------------------------------------------------------------------------//
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


export const thunkGetSingleProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(actionGetSingleProduct(data))
        return data;
    }

    return "Product with this id does not exist";
}


//REDUCER----------------------------------------------------------------------------------------------//

let initialState = {
    products: {},
    singleProduct: { Seller: {}, ProductImages:[]},
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
        case GET_EACH_PRODUCT:{
            newState = { ...state };
            const product = action.product;
            console.log('get each item- product', product)
            newState.singleProduct = { ...product };
            newState.singleProduct.Seller = { ...product.Seller };
            newState.singleProduct.ProductImages.push (...product.ProductImages)
            return newState;
        }

        default:
            return state;
    }
}
