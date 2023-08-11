import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
// import * as productActions from "../../store/product"
import { thunkGetAllProducts } from "../../store/product";
import EachProduct from "./EachProduct";
import "./Products.css"


const GetAllProducts = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => Object.values(state.products.products))
    // console.log('WHAT AM I GETTING BACK HERE', allProducts)

    useEffect(() => {
        dispatch(thunkGetAllProducts());
    }, [dispatch])


    const featureComingSoonClick = () => {
        alert("Feature coming soon!");
    };


    return(
        <>
            <div className="all-products-container">
                <a className="filter-link" onClick={featureComingSoonClick}>+ Filter</a>
                <div className="product-page-grid">
                    {allProducts.map((product) => (
                        <NavLink to={`/products/${product.id}`} className="product-link" title={product.name}>
                            <EachProduct product={product}/>
                        </NavLink>
                    ))}
                </div>

            </div>
        </>
    )
}


export default GetAllProducts;
