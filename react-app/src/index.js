import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import * as productActions from "./store/product"
import App from "./App";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	window.store = store;
	window.sessionActions = sessionActions;
	window.productActions = productActions;
}

//example to use in console to test thunk
//window.store.dispatch(window.actionName.thunkName(arg))
//PRODUCTS-----------------------------------------------
//window.store.dispatch(window.productActions.thunkGetAllProducts())
//window.store.dispatch(window.productActions.thunkGetSingleProduct(:productId))
//window.store.dispatch(window.productActions.thunkDeleteSingleProduct(:productId))
//window.store.dispatch(window.productActions.thunkGetUsersProducts())
// window.store.dispatch(
// 	window.productActions.thunkCreateNewProduct({
// 		item_name: "try plant",
// 		price: "300",
// 		product_quantity: "2",
// 		product_description: "Beautiful try plant",
// 		product_dimension: "insert dimension here",
// 		product_preview_image: "try url",
// 	})
//   );
// window.store.dispatch(
//     window.productActions.thunkUpdateSingleProduct(2, {
//         item_name: "TESTINGtry plant",
//         price: "300",
//         product_quantity: "2",
//         product_description: "Beautiful try plant",
//         product_dimension: "insert dimension here",
//         product_preview_image: "try url",
//     }, {
//     email: "demo@aa.io",
//     first_name: "Demo",
//     id: 1,
//     last_name: "User",
//     username: "Demo"
// })
// );

////manually checking if seller will be added during creation of new product to mimic what will happen in the component side
// window.store.dispatch(
// 	window.productActions.thunkCreateNewProduct({
// 		item_name: "xxtry plant",
// 		product_price: 300.87,
// 		product_quantity: 2,
// 		product_description: "Beautiful try plant",
// 		product_dimension: "insert dimension here",
// 		product_preview_image: "try url",
// 	}, {
//     email: "demo@aa.io",
//     first_name: "Demo",
//     id: 1,
//     last_name: "User",
//     username: "Demo"
// })
//   );


// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
	return (
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
					<Modal />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
