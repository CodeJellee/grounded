import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrentCart, thunkPostItemToCart } from "../../store/cart";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

function AddProductToCart({productId}) {

    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const productState = useSelector((state) => (state.products.singleProduct))
    const currentCart = useSelector((state) => Object.values(state.cart.currentCart))
    console.log('WHAT IS CURRENT CART', currentCart)

    const productBelongsToUser = () => {
        console.log('WHAT IS PRINTING OUT HERE', productState.sellerId, sessionUser.id)
        return productState.sellerId === sessionUser.id
    };


    const productAlreadyInCart = () => {
        console.log('IS THIS HITTING', currentCart, productId)
        for (const item of currentCart) {
            console.log('WHAT IS ITEM IN CURRENTCART FOR LOOP', item)
            if (item.productId === productState.id) {
                console.log('ARE THE ITEMS ALREADY IN TEH CART', item.productId, productState.id)
                return true
            }

        }
        return false;
    }

    const onClick = async (e) => {
        e.preventDefault();
        if (productBelongsToUser()) {
            alert("You own this product!");
            return;
        }

        if (productAlreadyInCart()) {
            alert("Product is already in your cart!");

        } else {

            await dispatch(thunkPostItemToCart(productState.id));
            await dispatch(thunkGetCurrentCart());
            history.push("/carts")

        }
    }

    return(
        <>
        <button className='PID-cartButt PID-P-button' onClick={onClick}>Add To Cart</button>
        </>
    )

}

export default AddProductToCart;
