import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { thunkGetUsersProducts } from "../../store/product";
import EachUserProduct from "./EachUserProduct";
import CreateNewProductForm from "./CreateNewProductForm";
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
                <div className="user-selling-new-and-filter">
                    <NavLink to={`/products/new`} className="create-new-product-link">
                        <a className="list-another-plant-to-sell">List another plant to sell!</a>
                    </NavLink>
                    <a className="filter-link" onClick={featureComingSoonClick}>+ Filter</a>
                </div>
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
