// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCartItems, fetchNonPurchasedCartItems } from "./path/to/cartActions";

// const CartComponent = () => {
//   const dispatch = useDispatch();
//   const allCartItems = useSelector((state) => state.cart.allCartItems);
//   const nonPurchasedCartItems = useSelector((state) => state.cart.nonPurchasedCartItems);

//   useEffect(() => {
//     dispatch(fetchAllCartItems());
//     dispatch(fetchNonPurchasedCartItems());
//   }, [dispatch]);

//   // Use allCartItems and nonPurchasedCartItems as needed in your component

//   return (
//     <div>
//       {/* Render your cart items */}
//     </div>
//   );
// };

// export default CartComponent;




// With this setup, when you dispatch the fetchAllCartItems and fetchNonPurchasedCartItems actions,
// they will fetch the data from the respective endpoints and update the Redux store's state.
// You can then use the allCartItems and nonPurchasedCartItems slices of state in your
// component to render the cart items as needed.
