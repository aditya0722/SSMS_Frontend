import React,{useEffect } from 'react';
import { Routes, Route,useNavigate } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
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
import UserReceiptManagement from './components/UserReceiptManagement';
import UserStoreManagenemt from './components/UserStoreManagement';
import ItemsReceiptManagement from './components/ItemsReceiptManagement';
import AttandanceManagement from './components/AttandanceManagement';
import UserAttandance from './components/UserAttandance';
import { useUser } from './components/UserContext';
import PrivateRoute from './components/PrivateRoute';
import ConstitutionPage from './components/ConstitutionPage';
import Footer from './components/footer';
import Blogs from './components/Blogs';



function App() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      // Navigate to the appropriate dashboard based on the user type only on initial load
      if (window.location.pathname === "/") {
        if (user.userType === "user") {
          navigate("/UserDashboard");
        } else {
          navigate("/AdminDashboard");
        }
      }
    }
  }, [setUser, navigate]); useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      // Navigate to the appropriate dashboard based on the user type only on initial load
      if (window.location.pathname === "/") {
        if (user.userType === "user") {
          navigate("/UserDashboard");
        } else {
          navigate("/AdminDashboard");
        }
      }
    }
  }, [setUser, navigate]); useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      // Navigate to the appropriate dashboard based on the user type only on initial load
      if (window.location.pathname === "/") {
        if (user.userType === "user") {
          navigate("/UserDashboard");
        } else {
          navigate("/AdminDashboard");
        }
      }
    }
  }, [setUser, navigate]);
  return (
    <>
     
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path='/Gallery' element={<Gallery />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path='/Members' element={<Members />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ConstitutionPage" element={<ConstitutionPage />} />
          <Route path="/Blogs" element={<Blogs/>} />
          {/* Admin Routes */}
          <Route 
            path="/AdminDashboard" 
            element={
              <PrivateRoute allowedTypes={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/StoreManagenemt" 
            element={
              <PrivateRoute allowedTypes={['admin']}>
                <StoreManagenemt />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/UserManagement" 
            element={
              <PrivateRoute allowedTypes={['admin']}>
                <UserManagement />
              </PrivateRoute>
            } 
        />
          <Route 
            path="/AccountManagement" 
            element={
              <PrivateRoute allowedTypes={['admin']}>
                <AccountManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/BlogManagement" 
            element={
              <PrivateRoute allowedTypes={['admin']}>
                <BlogManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/ItemsReceiptManagement" 
            element={
              <PrivateRoute allowedTypes={['admin']}>
                <ItemsReceiptManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/AttandanceManagement" 
            element={
              <PrivateRoute allowedTypes={['admin']}>
                <AttandanceManagement />
              </PrivateRoute>
            } 
          />

          {/* User Routes */}
          <Route 
            path="/UserDashboard" 
            element={
              <PrivateRoute allowedTypes={['user']}>
                <UserDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/Users" 
            element={
              <PrivateRoute allowedTypes={['user']}>
                <Users />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/UserBlogManagement" 
            element={
              <PrivateRoute allowedTypes={['user']}>
                <UserBlogManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/UserAccountManagement" 
            element={
              <PrivateRoute allowedTypes={['user']}>
                <UserAccountManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/UserStoreManagenemt" 
            element={
              <PrivateRoute allowedTypes={['user']}>
                <UserStoreManagenemt />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/UserReceiptManagement" 
            element={
              <PrivateRoute allowedTypes={['user']}>
                <UserReceiptManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/UserAttandance" 
            element={
              <PrivateRoute allowedTypes={['user']}>
                <UserAttandance />
              </PrivateRoute>
            } 
          />
        </Routes>

      <Footer />
    </>
  );
}

export default App;
