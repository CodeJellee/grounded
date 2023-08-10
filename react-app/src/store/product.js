//TYPE----------------------------------------------------------------------------------------------//
const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"
const GET_EACH_PRODUCT = "products/GET_EACH_PRODUCT"
const CREATE_NEW_PRODUCT = "prodcuts/CREATE_NEW_PRODUCT"
// const UPDATE_EACH_PRODUCT = "/products/UPDATE_EACH_PRODUCT"


//ACTION----------------------------------------------------------------------------------------------//
const actionGetAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    products,
})

const actionGetSingleProduct = (product) => ({
    type: GET_EACH_PRODUCT,
    product,
})

const actionCreateNewProduct = (product) => ({
    type: CREATE_NEW_PRODUCT,
    product,
})

// const  actionUpdateSingleProduct = (product) => ({
//     type: UPDATE_EACH_PRODUCT,
//     product,
// })


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


export const thunkCreateNewProduct = (product) => async (dispatch) => {
    try {

        console.log("thunkCreateNew Body:", JSON.stringify(product))

        let response = await fetch (`/api/products/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (response.ok){
            const data = await response.json();
            dispatch(actionCreateNewProduct(data));
            return data
        } else {
            const errorResponse = await response.json();
            return errorResponse
        }

    } catch (e) {
        return { error: e.message };
    }
}


// export const thunkUpdateSingleProduct = (productId) => async(dispatch) => {
//     const response = await fetch(`/api/products/${productId}`, {
//         method: "POST",
//         headers: {

//         }
//     })
// }

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
            // console.log('get each item- product', product)
            newState.singleProduct = { ...product };
            newState.singleProduct.Seller = { ...product.Seller };
            newState.singleProduct.ProductImages.push (...product.ProductImages)
            return newState;
        }
        case CREATE_NEW_PRODUCT:{
            newState = { ...state };
            newState.singleProduct = {};
            const product = action.product;
            console.log('createNewProductReducer action.product', product)
            newState.singleProduct = product;
            newState.products[product.New_Product.id] = {
                Seller: product.Seller,
                ProductImages: product.ProductImages,
                ...product.New_Product,
            }
            return newState
        }

        default:
            return state;
    }
}
