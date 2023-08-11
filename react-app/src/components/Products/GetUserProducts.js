import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { thunkGetUsersProducts } from "../../store/product";
import EachUserProduct from "./EachUserProduct";
import "./Products.css"

const GetUserProducts = () => {
    const dispatch = useDispatch()
    const allUserProducts = useSelector((state) => Object.values(state.products.userProducts));

    useEffect(() => {
        dispatch(thunkGetUsersProducts())
    }, [dispatch])

    const featureComingSoonClick = () => {
        alert("Feature coming soon!");
    };

    return(
        <>
            <div className="all-products-container">
                <h3 className="user-selling-blurb">Plants You Are Selling!</h3>
                <a onClick={featureComingSoonClick}>+ Filter</a>
                <div className="product-page-grid">
                    {allUserProducts.map((product) => (
                        <NavLink to={`/products/${product.id}`} className="product-link" title={product.name}>
                            <EachUserProduct product={product}/>
                        </NavLink>
                    ))}
                </div>

            </div>
        </>
    )

}





export default GetUserProducts;
