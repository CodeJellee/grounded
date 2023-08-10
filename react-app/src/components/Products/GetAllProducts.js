import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as productActions from "../../store/product"
import EachProduct from "./EachProduct";
// import "./GetAllProducts.css"


const GetAllProducts = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => Object.values(state.products))

    useEffect(() => {
        dispatch(productActions.thunkGetAllProducts());
    }, [dispatch])

    return(
        <>
            <div className="all-products-container">
                {allProducts.map((product) => (
                    <NavLink to={`/products/${product.id}`} className="product-link" title={product.name}>
                        <EachProduct product={product}/>
                    </NavLink>
                ))}

            </div>
        </>
    )
}


export default GetAllProducts;

