// // cartActions.js
// export const fetchAllCartItems = () => async (dispatch) => {
//     const response = await fetch("/api/cart");
//     if (response.ok) {
//       const data = await response.json();
//       dispatch(setAllCartItems(data.CurrentCart));
//     }
//   };

//   export const fetchNonPurchasedCartItems = () => async (dispatch) => {
//     const response = await fetch("/api/cart/nonpurchased");
//     if (response.ok) {
//       const data = await response.json();
//       dispatch(setNonPurchasedCartItems(data.NonPurchasedCart));
//     }
//   };

//   export const setAllCartItems = (cartItems) => ({
//     type: "SET_ALL_CART_ITEMS",
//     payload: cartItems,
//   });

//   export const setNonPurchasedCartItems = (cartItems) => ({
//     type: "SET_NON_PURCHASED_CART_ITEMS",
//     payload: cartItems,
//   });




// cartReducer.js
// const initialState = {
//     allCartItems: [],
//     nonPurchasedCartItems: [],
//   };

//   const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case "SET_ALL_CART_ITEMS":
//         return { ...state, allCartItems: action.payload };
//       case "SET_NON_PURCHASED_CART_ITEMS":
//         return { ...state, nonPurchasedCartItems: action.payload };
//       // Other cases...
//       default:
//         return state;
//     }
//   };
