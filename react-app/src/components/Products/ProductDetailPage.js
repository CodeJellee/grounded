import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { thunkGetSingleProduct } from "../../store/product";


const GetProductById = () => {
    let { productId } = useParams()
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const productState = useSelector((state) => (state.products.singleProduct))
    const history = useHistory()

    // console.log('PRODUCT DETAIL PAGE USE SELECTOR', productState)

    // useEffect(() => {

    //     async function productExistCheck() {

    //         let check = await dispatch(thunkGetSingleProduct(productId))

    //         if (check === "Product couldn't be found.") {
    //             history.push(`/products`)
    //         }
    //     }

    //     productExistCheck()

    // }, [dispatch, productId])

    useEffect(() => {
        dispatch(thunkGetSingleProduct(productId))
    }, [dispatch, productId]);


    return(
        <>
            <div>
                <div className="product-detail-image-container">
                    <div className="product-detail-description">
                        <div>{productState.item_name}</div>
                        <div>${productState.product_price}</div>
                        <div>{productState.product_description}</div>
                        <div>{productState.product_dimension}</div>
                        {/* <div>{productState.product_quantity}</div> */}
                        <button className="add-to-cart-button">Add To Cart</button>
                    </div>
                    <div className="product-detail-image">
                        <img className="product-by-id-image" src={productState.product_preview_image} alt={productState.item_name}/>
                    </div>
                </div>
                <div className="product-detail-description-bottom">
                    <div>Description</div>
                    <div>{productState.product_description}</div>
                </div>
            </div>
        </>
    )

}


export default GetProductById;
