import { useModal } from "../../context/Modal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateItemQuantityAndPurchase } from "../../store/cart";
import { thunkGetCurrentCart } from "../../store/cart";
import "./Carts.css";

function EditQuantityItemModal({ cartItem }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [newQuantity, setNewQuantity] = useState(cartItem.cart_quantity);

  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      cart_quantity: Number(newQuantity),
      purchased: false,
    };

    try {
      await dispatch(thunkUpdateItemQuantityAndPurchase(cartItem.id, payload));
      await dispatch(thunkGetCurrentCart());
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }

    closeModal();
  };

  return (
    <div className="modal-content-container">
      <form className="edit-cart-item-form" onSubmit={onSubmit}>
        <div className="edit-cart-info">
          <div>
            <img
              className="edit-cart-image"
              src={cartItem.Product.product_preview_image}
              alt={cartItem.Product.item_name}
            />
            <div className="cart-item-name-in-modal">{cartItem.Product.item_name}</div>
          </div>
          <div>
            <div className="edit-quantity-container">
              <div>Quantity:</div>
              <input
                type="number"
                className="quantity-input"
                name="quantity"
                min="1"
                value={newQuantity}
                onChange={handleQuantityChange}
              />
            </div>
              {/* <div>${cartItem.Product.product_price}</div> */}
              <div  className="edit-button-container">
                <button type="submit" className="edit-button">Update</button>
              </div>
            <div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditQuantityItemModal;
