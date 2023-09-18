import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import GetAllProducts from "./components/Products/GetAllProducts";
import GetProductById from "./components/Products/ProductDetailPage";
import GetUserProducts from "./components/Products/GetUserProducts";
import CreateNewProductForm from "./components/Products/CreateNewProductForm";
import EditProductForm from "./components/Products/EditProductForm";
import { thunkGetAllProducts, thunkGetUsersProducts } from "./store/product";
import { thunkGetCurrentCart } from "./store/cart";
import { thunkGetPastCart } from "./store/cart";
import GetCurrentCart from "./components/Cart/GetCurrentCart"
import ProtectedRoute from "./components/auth/ProtectedRoute"

import GetAllArticles from "./components/Articles/GetAllArticles";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const userExists = useSelector((exist) => exist.session.user)

  useEffect(() => {
    dispatch(authenticate())
      .then(() => setIsLoaded(true)) //skeleton
      .then(() => dispatch(thunkGetAllProducts())) //thunk hydrates the store on mount/when first loading site, not sure if I need this now...

      .then(() => {
        if (userExists != null) {
          return Promise.all([
            dispatch(thunkGetUsersProducts()),
            dispatch(thunkGetCurrentCart()),
            dispatch(thunkGetPastCart())

          ]);
        }
        return Promise.resolve();
      })

      .catch((error) => {
        console.error("Error occurred:", error);
      });

  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          {/* <Route exact path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/products">
            <GetAllProducts />
          </Route>
          <Route exact path="/articles">
            <GetAllArticles />
          </Route>
          <ProtectedRoute exact path="/carts">
            <GetCurrentCart />
          </ProtectedRoute>
          <ProtectedRoute exact path="/products/current">
            <GetUserProducts />
          </ProtectedRoute>
          <ProtectedRoute exact path="/products/new">
            <CreateNewProductForm />
          </ProtectedRoute>
          <ProtectedRoute exact path="/products/:productId/edit">
            <EditProductForm />
          </ProtectedRoute>
          <Route path="/products/:productId">
            <GetProductById />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
