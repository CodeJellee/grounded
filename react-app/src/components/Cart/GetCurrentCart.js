import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { thunkGetCurrentCart } from "../../store/cart";
import EachCartItem from "../Cart/EachCartItem"
import "./Carts.css"

const GetCurrentCart = () => {
  const dispatch = useDispatch();
  const allCartItems = useSelector((state) => Object.values(state.cart.currentCart));
//   console.log('what is allCartItems', allCartItems)
  const allProducts = useSelector((state) => Object.values(state.products.products))
//   const nonPurchasedCartItems = useSelector((state) => state.cart.nonPurchasedCartItems);

  useEffect(() => {
    dispatch(thunkGetCurrentCart());
    // dispatch(fetchNonPurchasedCartItems());
  }, [dispatch]);



  return (
    <div>
        <h3 className="cart-blurb">Shopping Cart</h3>
        <div className="cart-page-grid">
                    {allCartItems.map((cartItem) => (
                        <NavLink to={`/products/${cartItem.productId}`} className="product-link" title={cartItem.id}>
                            <EachCartItem cartItem={cartItem}/>
                        </NavLink>
                    ))}
        </div>
    </div>
  );
};

export default GetCurrentCart;
