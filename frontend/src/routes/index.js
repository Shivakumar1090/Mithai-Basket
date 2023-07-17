import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Routes, Navigate } from 'react-router-dom';
import privateRoute from "./privateroutes";
import Loader from "../components/Loader/loader";

// import AdminProducts from "../adminPages/products";
// import AdminOrders from "../adminPages/orders";
// import AdminDashBoard from "../adminPages/dashboard";

// import CustomerLogin from "./pages/auth/login";
// import CustomerRegisteration from "./pages/auth/register";
// import Cart from "./pages/Cart";
// import Product from "./pages/products/product";
// import Welcome from "../pages/welcome";
import Navbar from "../components/Navbar";
// import Products from "./pages/products";
import { useSelector } from "react-redux";
// import Payment from "./pages/payment/payment";
// import OrdersSection from "./pages/orders/orders";

const Welcome = React.lazy(() => import('../pages/welcome/index'));
const CustomerLogin = React.lazy(() => import('../pages/auth/login'));
const Register = React.lazy(() => import('../pages/auth/register'));
const Cart = React.lazy(() => import('../pages/Cart'));
const Products = React.lazy(() => import('../pages/products'));
const ProductDetails = React.lazy(() => import('../pages/products/product'));
const AdminDashBoard = React.lazy(() => import('../adminPages/dashboard/index'));
const AdminOrders = React.lazy(() => import('../adminPages/orders'));
const AdminProducts = React.lazy(() => import('../adminPages/products'));
const OrdersSection = React.lazy(() => import('../pages/orders/orders'));
const Payment = React.lazy(() => import('../pages/payment/payment'));

const AppRouter = () => {
    const user = useSelector((state) => state.user);
    // const isAuthenticated = user?.isLogged;
    return (
        <Suspense fallback={<Loader />}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Welcome />}
                    />
                    <Route
                        exact
                        path="/login"
                        element={<CustomerLogin/>}
                    />
                    <Route
                        exact
                        path='/register'
                        element={<Register/>}
                    />
                    <Route
                        exact
                        path='/cart'
                        element={<Cart/>}
                    />
                    <Route
                        exact
                        path='/products'
                        element={<Products/>}
                    />
                    <Route
                        exact
                        path='/product/:id'
                        element={<ProductDetails/>}
                    />
                    <Route
                        exact
                        path='/orders'
                        element={<OrdersSection/>}
                        // isAuthenticated={isAuthenticated}
                    />
                    <Route 
                        exact
                        path='/payment'
                        element={<Payment />}
                        // isAuthenticated={isAuthenticated}
                    />
                    <Route 
                        exact
                        path='/admin'
                        element={<AdminDashBoard />}
                        // isAuthenticated={isAuthenticated && user.isAdmin}
                    />
                    <Route 
                        exact
                        path='/admin/orders'
                        element={<AdminOrders />}
                        // isAuthenticated={isAuthenticated && user.isAdmin}
                    />
                    <Route 
                        exact
                        path='/admin/products'
                        element={<AdminProducts />}
                        // isAuthenticated={isAuthenticated && user.isAdmin}
                    />
                    {/* <Navigate from='*' to='/'/> */}
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default AppRouter;