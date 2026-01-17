import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MainLayout from '../layouts/MainLayout'
import StateManage from '../pages/StateManage'
import LoginTest from '../pages/LoginTest'
import NormalUserRoute from './NormalUserRoute'
import AuthContextProvider from '../auth/AuthProvider'
//adminpages
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import Categories from '../pages/Categories'
// import Products from '../pages/Products'

import CategoryManagement from '../pages/admin/CategoryManagement'
import CreateCategory from '../pages/admin/CreateCategory'
import ViewCategory from '../pages/admin/ViewCategory'
import UpdateCategory from '../pages/admin/UpdateCategory'
import AdminLayout from '../layouts/AdminLayout'
import ProductManagement from '../pages/admin/ProductManagement'
import CreateProduct from '../pages/admin/createProduct'
import UserManagement from '../pages/admin/UserManagement'
import AdminDashboard from '../pages/AdminDashboard'
import UpdateProduct from '../pages/admin/UpdateProduct'
import ViewProducts from '../pages/admin/viewProduct'
import ProductDetails from '../pages/productDetail'
import CartPage from '../pages/addToCart'
import WishlistPage from '../pages/wishListPage'
import ProfilePage from '../pages/profilePage'
import NecklacesPage from '../pages/sortyby/Necklaces'
import HoopsPage from '../pages/sortyby/Hoops'
import RingsPage from '../pages/sortyby/Rings'
import BraceletsPage from '../pages/sortyby/Bracelets'
import WatchesPage from '../pages/sortyby/Watches'
import TraditionalsPage from '../pages/sortyby/Traditionals'
import BestSellersPage from '../pages/sortyby/BestSellers'
import CheckoutPage from '../pages/checkOut'
import MyBag from '../pages/bagPage'
import VerifyOtp from '../pages/verifyotp'

export default function AppRouter() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/login-test' element={<LoginTest/>}></Route>
        <Route path='/state-test' element={<StateManage />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />}></Route>
          {/* <Route element={<GuestRoute/>}> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='/products/:id' element={<ProductDetails />}></Route>
          {/* <Route path="/tocart" element={<Cart />}></Route> */}
          <Route path="/wishlist" element={<WishlistPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/necklaces" element={< NecklacesPage/>}></Route>
          <Route path="/hoops" element={< HoopsPage/>}></Route>
          <Route path="/rings" element={< RingsPage/>}></Route>
          <Route path="/bracelets" element={< BraceletsPage/>}></Route>
          <Route path="/watches" element={< WatchesPage/>}></Route>
          <Route path="/traditionals" element={<TraditionalsPage/>}></Route>
          <Route path="/bestsellers" element={<BestSellersPage/>}></Route>
          <Route path="/tobag" element={<MyBag/>}></Route>
          <Route path="/verify-otp" element={<VerifyOtp />} />



        </Route>
        {/* </Route> */}
        <Route path='/normal/*' element={<NormalUserRoute/>}>
        <Route path='order' element={<>My Order</>}></Route>
        <Route path='cart' element={<>My Cart</>}></Route>
        <Route path='*' element={<>404 not found</>}></Route>
        </Route>

        
        <Route element={<MainLayout />}>
        <Route path='/admin/*'>
        <Route path='adashboard' element={<AdminDashboard/>}></Route>
        <Route path='users' element={<Users/>}></Route>
        <Route path='Categories' element={<Categories/>}></Route>
        {/* <Route path='products' element={<Products/>}></Route> */}
        </Route>
        <Route element={<AdminLayout/>}>
          <Route path='/admins/*'>
            <Route path='productss' element={<ProductManagement />}></Route>
            <Route path='productss/create' element={<CreateProduct/>}></Route>
            <Route path='productss/:id/edit' element={<UpdateProduct/>}></Route>
            <Route path='productss/:id' element={<ViewProducts/>}></Route>
            <Route path='categoryy' element={<CategoryManagement/>}></Route>
            <Route path='categoryy/:id' element={<ViewCategory/>}></Route>
            <Route path='categoryy/:id/edit' element={<UpdateCategory/>}></Route>
            <Route path='categoryy/create' element={<CreateCategory/>}></Route>
            <Route path='userss' element={<UserManagement />}></Route>
            
          </Route>
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthContextProvider> 
  );
}
