import React, { useEffect } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  ChecekoutPage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./routes/Routes.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopAllEvents,
  ShopCreateEvents,
  ShopAllCoupons,
  ShopPreviewPage,
} from "./routes/ShopRoutes.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import ProctectedRoute from "./routes/ProctedRoute.js";
import { ShopHomePage } from "./ShopRoute";
import SellerProctectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllevents } from "./redux/actions/event.js";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts())
    Store.dispatch(getAllevents())
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProctectedRoute>
              <ChecekoutPage />
            </ProctectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProctectedRoute>
              <ProfilePage />
            </ProctectedRoute>
          }
        />
         <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* Shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />

        <Route
          path="/shop/:id"
          element={
            <SellerProctectedRoute>
              <ShopHomePage />
            </SellerProctectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <SellerProctectedRoute>
              <ShopDashboardPage />
            </SellerProctectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProctectedRoute>
              <ShopCreateProduct />
            </SellerProctectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProctectedRoute>
              <ShopAllProducts />
            </SellerProctectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProctectedRoute>
              <ShopCreateEvents />
            </SellerProctectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProctectedRoute>
              <ShopAllEvents />
            </SellerProctectedRoute>
          }
        />
        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProctectedRoute>
              <ShopAllCoupons />
            </SellerProctectedRoute>
          }
        />

        {/* <Route path="/evets"  */}
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
