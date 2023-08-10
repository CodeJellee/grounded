import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import GetAllProducts from "./components/Products/GetAllProducts";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const userExists = useSelector((exist) => exist.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true)) //skeleton

      // .then(() => {
      //   if (userExists != null) {
      //     return Promise.all([
      //       //will add dispatch for shopping cart and user products only if a userExists

      //     ]);
      //   }
      //   return Promise.resolve();
      // })

      // .catch((error) => {
      //   console.error("Error occurred:", error);
      // });

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
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/products">
            <GetAllProducts />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
