import { useModal } from "../../context/Modal"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DeleteCartItemModal from "../Cart/DeleteCartItemModal"
import { thunkUpdateItemQuantityAndPurchase } from "../../store/cart";
import { thunkGetCurrentCart } from "../../store/cart";
import "./Carts.css"

function EachCartItem({cartItem}) {
    const { setModalContent } = useModal()
    const allCartItems = useSelector((state) => Object.values(state.cart.currentCart));
    const dispatch = useDispatch();
    const history = useHistory()

    const [cart_quantity, setCart_quantity] = useState("");
    const [purchased, setPurchased] = useState("");

    const [submitted, setSubmitted] = useState(false)

    const onSubmit = async (e) => {
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

    // const featureComingSoonClick = () => {
    //     alert("Feature coming soon!");
    // };


    return (
        <>
            <button onClick={onSubmit}>Update</button>
            <form className="create-new-product-form" type="submit">
                <div className="each-cart-item-container">
                    <div className="cart-photo-and-title">
                        <input type="checkbox" class="toggle-input" />
                        <img className="cart-product-image" src={cartItem.Product.product_preview_image} alt={cartItem.Product.item_name}/>
                        <div className="cart-product-name">{cartItem.Product.item_name}</div>
                    </div>
                    <div className="cart-quantity-price-delete">
                        <input
                            id="quantity-input"
                            type="number"
                            className="quantity-input"
                            name="quantity"
                            min="1"
                            defaultValue={cartItem.cart_quantity}
                        />
                        <div className="cart-price-delete">
                            <div className="each-product-price">${cartItem.Product.product_price}</div>
                            <button className="cart-delete-button" onClick={(() => setModalContent(<DeleteCartItemModal productId={cartItem.productId}/>))}>✕</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}


export default EachCartItem;


// import { useModal } from "../../context/Modal"
// import { useSelector } from "react-redux";
// import DeleteCartItemModal from "../Cart/DeleteCartItemModal"
// import "./Carts.css"

// function EachCartItem({cartItem}) {
//     const { setModalContent } = useModal()
//     const allCartItems = useSelector((state) => Object.values(state.cart.currentCart));

//     // const featureComingSoonClick = () => {
//     //     alert("Feature coming soon!");
//     // };


//     return (
//         <div className="each-cart-item-container">
//             <div className="cart-photo-and-title">
//                 <img className="cart-product-image" src={cartItem.Product.product_preview_image} alt={cartItem.Product.item_name}/>
//                 <div className="cart-product-name">{cartItem.Product.item_name}</div>
//             </div>
//             <div className="cart-quantity-price-delete">
//                 <div className="cart-product-quantity">Quantity</div>
//                 <div className="cart-price-delete">
//                     <div className="each-product-price">${cartItem.Product.product_price}</div>
//                     <button className="cart-delete-button" onClick={(() => setModalContent(<DeleteCartItemModal productId={cartItem.productId}/>))}>✕</button>
//                 </div>
//             </div>
//         </div>
//     )
// }


// export default EachCartItem;
