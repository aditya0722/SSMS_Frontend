import React, { useState,useContext  } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { Warning } from '@mui/icons-material';
import NavBar from './NavBar';
import { useUser } from './UserContext';
import { useNavigate,Link } from 'react-router-dom';
import Spinner from './Spinner';
import ProgressBar from './ProgressBar';
const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [contact, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!contact || !password) {
      setSnackbar({ open: true, message: 'Please fill the complete form', severity: 'error' });
      return;
    }

    try {
      const res = await axios.post('https://ssmss-backend.onrender.com/api/login', { contact, password });
      console.log(res.data)
      const user = res.data.data[0];
     
      setUser(user);
      setLoading(false);
       if (user.userType === 'admin') {
        navigate('/AdminDashboard');
      } else {
        navigate('/UserDashboard');
      }
    } catch (error) {
      setLoading(false);
      console.log(error)
      setSnackbar({ open: true, message: 'Invalid Phone Number or Password', severity: 'error' });
    }
  };

  return (
    <>
    <ProgressBar loading={loading} />
          <Spinner loading={loading} />
      <NavBar />
      <div className="relative bg-blue-50 overflow-hidden min-h-screen flex items-center justify-center">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-50 transform translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-50 transform translate-x-[50%] translate-y-[50%]"></div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Login</h1>
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label className="block text-blue-800 mb-2" htmlFor="contact">Phone Number</label>
                <input type="number" className="w-full p-2 border border-blue-300 rounded" onChange={(e) => setNumber(e.target.value)} />
              </div>
              <div>
                <label className="block text-blue-800 mb-2" htmlFor="password">Password</label>
                <input type="password" className="w-full p-2 border border-blue-300 rounded" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">Login</button>
            </form>
            <p className="text-blue-600 mt-4 text-center">
              Forgot your Password? <Link to="/ForgotPassword" className="text-blue-800 hover:underline">Click me</Link>
            </p>
          </div>
          <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} icon={<Warning className="text-red-500" />}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
};

export default Login;
