import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "./NavBar";
import { useNavigate,Link } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate=useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login/forgotPassword', { phoneNumber });
      console.log(response)
      if (response.data==="Found") {
        setShowPasswordForm(true);
        setError('');
      } else {
        setError('Phone number not found.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login/updatepassword', { phoneNumber, newPassword });
      if (response.data==="success") {
        setSuccessMessage('Password updated successfully.');
        setError('');
        setShowPasswordForm(false);
        navigate('/login')
      } else {
        setError('Failed to update the password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="relative bg-blue-50 overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-50 transform translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-50 transform translate-x-[50%] translate-y-[50%]"></div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className=" text-4xl font-bold text-blue-800 mb-6 text-center">Forgot Password</h1>

            {!showPasswordForm && (
              <form className="space-y-6" onSubmit={handlePhoneNumberSubmit}>
                <div>
                  <label className="block text-blue-800 mb-2" htmlFor="phone">Phone Number</label>
                  <input
                    type="number"
                    id="phone"
                    className="w-full p-2 border border-blue-300 rounded"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                  Send Code
                </button>
              </form>
            )}

            {showPasswordForm && (
              <form className="space-y-6" onSubmit={handlePasswordUpdate}>
                <div>
                  <label className="block text-blue-800 mb-2" htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full p-2 border border-blue-300 rounded"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-blue-800 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full p-2 border border-blue-300 rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                  Update Password
                </button>
              </form>
            )}

            <p className="text-blue-600 mt-4 text-center">
              Remembered your Password? <Link to="/Login" className="text-blue-800 hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
