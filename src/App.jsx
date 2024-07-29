import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import Main from './components/Main';
import Footer from './components/footer';
import {Routes,Route} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Members from './components/Members';
import Contact from './components/Contact';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './components/AdminDashboard';
import StoreManagenemt from './components/StoreManagenemt';
import UserManagement from './components/UserManagement';
import AccountManagement from './components/AccountManagement';
import BlogManagement from './components/BlogManagement';
import UserDashboard from './components/UserDashboard';
import Users from './components/Users';
import UserBlogManagement from './components/UserBlockManagement';
import UserAccountManagement from './components/UserAccountManagement';
import UserStoreManagenemt from './components/UserStoreManagement';
import ItemsReceiptManagement from './components/ItemsReceiptManagement';
function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path='/Gallery' element={<Gallery/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path='/Members' element={<Members/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
      <Route path="/StoreManagenemt" element={<StoreManagenemt/>}/>
      <Route path="/UserManagement" element={<UserManagement/>}/>
      <Route path="/AccountManagement" element={<AccountManagement/>}/>
      <Route path="/BlogManagement" element={<BlogManagement/>}/>
      <Route path="/UserDashboard" element={<UserDashboard/>}/>
      <Route path="/Users" element={<Users/>}/>
      <Route path="/UserBlogManagement" element={<UserBlogManagement/>}/>
      <Route path="/UserAccountManagement" element={<UserAccountManagement/>}/>
      <Route path="/UserStoreManagenemt" element={<UserStoreManagenemt/>}/>
      <Route path="/ReceiptManagement" element={<ItemsReceiptManagement/>}/>
    </Routes>
    <Footer/>
  </>
  )
}

export default App
