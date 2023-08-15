import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkPostItemToCart } from "../../store/cart";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

function AddProductToCart({productId}) {

    const dispatch = useDispatch()
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user)
    const product = useSelector(state => state.products.singleProduct)
    const currentCart = useSelector(state => state.carts)

    const productBelongsToUser = () => {
        return product.sellerId === currentUser.id
    };

    let currentCartItems = Object.values(cartItems.currentCart)

    const productAlreadyInCart = () => {

        for (const item of currentCartItems) {
            if (item.productId === productId) {
                return true
            }

        }
        return false;
    }

    const onClick = (e) => {
        e.preventDefault();
        if (productBelongsToUser()) {
            alert("You own this product!");
            return;
        }
        if (productAlreadyInCart()) {
            alert("Product is already in your cart!");
            return;
        }
        else {

            dispatch(thunkPostItemToCart(product.id))
            history.push("/carts")

        }
    }



}
