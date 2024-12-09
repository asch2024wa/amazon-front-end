import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import LandingPage from "./Pages/LandingPage";
import Auth from "./Pages/Auth/Auth";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import CarouselEffect from "./components/Carousel/CarouselEffect";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import ProductDetail from "./Pages/ProductDetail/ProductDetail";
const stripePromise = loadStripe(
  "pk_test_51QTRYeFPFRfhTB6doV3wwXk9xqna7VDUIrs5n7bOSqXnKl2062PG1A7p6dEoh3ML92CIW1P4h8x40Z35xUTBhQH80004Yqr8ld"
);
function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route Path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/auth" element={<Auth />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg={"you have to login to access the orders"}
                redirect={"/orders"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute msg={"sign in to pay"} redirect={"/payment"}>
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productID" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
