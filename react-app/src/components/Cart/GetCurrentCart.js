import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { thunkGetCurrentCart, thunkCheckoutCart } from "../../store/cart";
import EachCartItem from "../Cart/EachCartItem"
import "./Carts.css"

const GetCurrentCart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allCartItems = useSelector((state) => Object.values(state.cart.currentCart));
//   console.log('what is allCartItems', allCartItems)
    const allProducts = useSelector((state) => Object.values(state.products.products))
//   const nonPurchasedCartItems = useSelector((state) => state.cart.nonPurchasedCartItems);
    const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);


    const calculateItemTotal = (cartItem) => {
        return cartItem.cart_quantity * cartItem.Product.product_price;
    };

    useEffect(() => {
        dispatch(thunkGetCurrentCart());
        // dispatch(fetchNonPurchasedCartItems());
    }, [dispatch]);

    // const handleCheckoutClick = () => {
    //     setIsCheckoutClicked(true);
    //     history.push("/checkout");
    // };

    useEffect(() => {
        if (allCartItems) {
            const total = allCartItems.reduce((accumulator, cartItem) => {
                const itemTotal = calculateItemTotal(cartItem);
                return accumulator + itemTotal;
        }, 0);
        setCartTotal(total);
        }
    }, [allCartItems]);

    const handleClearCart = async () => {
        await dispatch(thunkCheckoutCart());
        await dispatch(thunkGetCurrentCart());
        alert ("Purchase was successful!")
        history.push('/')
      };



    return (
        <>
            <div className="get-current-cart-background-container">
                {allCartItems?.length === 0 || !allCartItems ? (
                    <>
                        <h2 className="empty-cart">Your cart is empty.</h2>
                        <h3 className="empty-cart">Go shop some plants!</h3>
                        <div class="button-container">
                            <NavLink to={`/products`}>
                                <button class="shop-button">Shop Now</button>
                            </NavLink>
                        </div>
                    </>
                ) : (
                    <div>
                        <h3 className="cart-blurb">Shopping Cart</h3>

                        <div className="checkout-button-container">
                            {isCheckoutClicked ? (
                            <span>Processing...</span>
                            ) : (
                                <div>
                                    <button className="checkout-button" onClick={handleClearCart}>
                                        Checkout
                                    </button>
                                    <p>Total Cost: ${cartTotal.toFixed(2)}</p>
                                </div>
                            )}
                        </div>

                        <div className="cart-page-grid">
                                    {allCartItems.map((cartItem) => (
                                        // <NavLink to={`/products/${cartItem.productId}`} className="product-link" title={cartItem.id} >
                                            <EachCartItem cartItem={cartItem}/>
                                        // </NavLink>
                                    ))}
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};

export default GetCurrentCart;
