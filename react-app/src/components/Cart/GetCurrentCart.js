import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { thunkGetCurrentCart } from "../../store/cart";
import { useModal } from "../../context/Modal"
import DeleteCartItemModal from "../Cart/DeleteCartItemModal"
import EachCartItem from "../Cart/EachCartItem"
import { thunkUpdateItemQuantityAndPurchase } from "../../store/cart";
import "./Carts.css"

const GetCurrentCart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { setModalContent } = useModal()

    const allCartItems = useSelector((state) => Object.values(state.cart.currentCart));
//   console.log('what is allCartItems', allCartItems)
    const allProducts = useSelector((state) => Object.values(state.products.products))
//   const nonPurchasedCartItems = useSelector((state) => state.cart.nonPurchasedCartItems);
    const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);

    const [cart_quantity, setCart_quantity] = useState("");
    const [purchased, setPurchased] = useState("");

    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        dispatch(thunkGetCurrentCart());
        // dispatch(fetchNonPurchasedCartItems());
    }, [dispatch]);

    const handleCheckoutClick = () => {
        setIsCheckoutClicked(true);
        history.push("/checkout");
    };

    const updateCartOnSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        let payload = {
            cart_quantity: Number(cart_quantity),
            purchased: purchased,
        };


        let fetchResponseFromThunk = await dispatch(thunkUpdateItemQuantityAndPurchase(payload));
        console.log('what are we getting back after creating a product s/p dispatch', fetchResponseFromThunk)

        if (fetchResponseFromThunk) {
            await dispatch(
                thunkGetCurrentCart()
            );
            history.push(`/carts`)
        }
    };

    const featureComingSoonClick = () => {
        alert("Feature coming soon!");
    };




    return (
        <>
            <div>
                <h3 className="cart-blurb">Shopping Cart</h3>

                <div className="checkout-button-container">
                    {isCheckoutClicked ? (
                    <span>Processing...</span>
                    ) : (
                    <button className="checkout-button" onClick={handleCheckoutClick}>
                        Checkout
                    </button>
                    )}
                </div>

                <div className="cart-page-grid">
                            {allCartItems.map((cartItem) => (
                                <>
                                    <div className="delete-only-button-container">
                                        <button className="cart-delete-button" onClick={(() => setModalContent(<DeleteCartItemModal productId={cartItem.productId}/>))}>✕</button>
                                    </div>
                                    <form className="each-cart-item-form" type="submit">
                                        <div className="each-cart-item-container">
                                            <div className="cart-photo-and-title">
                                                <input type="checkbox" class="toggle-input" />
                                                <img className="cart-product-image" src={cartItem.Product.product_preview_image} alt={cartItem.Product.item_name}/>
                                                <div className="cart-product-name">{cartItem.Product.item_name}</div>
                                            </div>
                                            <div className="cart-quantity-price-delete">
                                                <div>
                                                    <div>Quantity: </div>
                                                    <input
                                                        id="quantity-input"
                                                        type="number"
                                                        className="quantity-input"
                                                        name="quantity"
                                                        min="1"
                                                        defaultValue={cartItem.cart_quantity}
                                                    />
                                                </div>
                                                <button onClick={updateCartOnSubmit}>Update</button>
                                                <div className="cart-price-delete">
                                                    <div className="each-product-price">${cartItem.Product.product_price}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            ))}
                </div>
            </div>
        </>

    );
};

export default GetCurrentCart;



// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory, NavLink } from "react-router-dom";
// import { thunkGetCurrentCart } from "../../store/cart";
// import EachCartItem from "../Cart/EachCartItem"
// import "./Carts.css"

// const GetCurrentCart = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const allCartItems = useSelector((state) => Object.values(state.cart.currentCart));
// //   console.log('what is allCartItems', allCartItems)
//     const allProducts = useSelector((state) => Object.values(state.products.products))
// //   const nonPurchasedCartItems = useSelector((state) => state.cart.nonPurchasedCartItems);
//     const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);

//     useEffect(() => {
//         dispatch(thunkGetCurrentCart());
//         // dispatch(fetchNonPurchasedCartItems());
//     }, [dispatch]);

//     const handleCheckoutClick = () => {
//         setIsCheckoutClicked(true);
//         history.push("/checkout");
//     };



//     return (
//         <>
//             <div>
//                 <h3 className="cart-blurb">Shopping Cart</h3>

//                 <div className="checkout-button-container">
//                     {isCheckoutClicked ? (
//                     <span>Processing...</span>
//                     ) : (
//                     <button className="checkout-button" onClick={handleCheckoutClick}>
//                         Checkout
//                     </button>
//                     )}
//                 </div>

//                 <div className="cart-page-grid">
//                             {allCartItems.map((cartItem) => (
//                                 // <NavLink to={`/products/${cartItem.productId}`} className="product-link" title={cartItem.id} >
//                                     <EachCartItem cartItem={cartItem}/>
//                                 // </NavLink>
//                             ))}
//                 </div>
//             </div>
//         </>

//     );
// };

// export default GetCurrentCart;
