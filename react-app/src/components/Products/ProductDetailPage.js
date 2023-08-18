import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { thunkGetSingleProduct } from "../../store/product";
import AddProductToCart from "../Products/AddProductToCart";
import { useModal } from "../../context/Modal";


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
                        <div className="product-detail-page-item-name">{productState.item_name}</div>
                        <div className="product-detail-page-item-price">${productState.product_price}</div>
                        <div className="product-detail-page-item-description">{productState.product_description}</div>
                        <div className="product-detail-page-item-dimension">{productState.product_dimension}</div>

                        {sessionUser?.id ? (
                            <AddProductToCart productId={productId} className="add-to-cart-button" />
                        ) : (
                            <div>
                                <div className='PID-about-product-div'>Please
                                <NavLink className="log-signup-link" exact to="/login"> login or sign up </NavLink>
                                to view or purchase the items!</div>
                            </div>
                        )}

                    </div>
                    <div className="product-detail-image">
                        <img className="product-by-id-image" src={productState.product_preview_image} alt={productState.item_name}/>
                    </div>
                </div>
                <div className="product-detail-description-bottom">
                    <div className="product-detail-page-item-bottom-description-title">Description</div>
                    <div className="product-detail-page-item-bottom-description">{productState.product_description}</div>
                </div>
            </div>
        </>
    )

}


export default GetProductById;
