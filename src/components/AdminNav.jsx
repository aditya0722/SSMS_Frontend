import React, { useEffect, useState } from 'react';
import { ExitToApp } from '@mui/icons-material';
import { FaBars } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { useUser } from "./UserContext"
import { useNavigate } from 'react-router-dom';
const AdminNav = ({ toggleSidebar }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
 
  useEffect(() => {
    if (!user) {
      console.log("User is not logged in, redirecting...");
      navigate('/');
    }
  }, [user, navigate]);
  
  useEffect(() => {
   
    const updateTimeAndDate = () => {
      const now = new Date();
      const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      setTime(now.toLocaleTimeString([], timeOptions));
      const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
      setDate(now.toLocaleDateString([], dateOptions));
    };

    updateTimeAndDate();
    const intervalId = setInterval(updateTimeAndDate, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {

    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <nav className="bg-white shadow-md text-black p-4 flex items-center justify-evenly ">
      {/* Sidebar Toggle (visible only on mobile) */}
      <div className="lg:hidden">
        <button id="sidebarToggle" className=" focus:outline-none" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      {/* Logo and Name */}
      <div className="flex items-center space-x-2">
        <img src="https://res.cloudinary.com/dzjlrwbfe/image/upload/v1723526685/logo_sqq9fo.jpg" alt="Logo" className="h-12 w-14" />
        <span className="text-lg font-semibold">SSMSS</span>
      </div>
      {/* Spacer to push elements to the right */}

      {/* Time and Date */}
      <div className="hidden md:flex items-center space-x-2">
        <FaClock />
        <span>{time}</span>
        <span>{date}</span>
      </div>
      <div></div>
      <div></div>
      <div></div>
      {/* User Icon and Logout Button */}
      <div className="hidden md:flex items-center space-x-4">
        {user && (
          user.imageUrl ? (
            <img src={user.imageUrl} alt="User" height="50" width="50" style={{borderRadius:"50%"}}/>
          ) : (
            <img src="https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg" style={{borderRadius:"50%"}} alt="User" height="50" width="50"/>
          )
        )}
        {user &&(
 <span className=" text-lg font-semibold">{user.name||"someone"}</span>
        )}
       
      </div>

      <button className=" focus:outline-none" onClick={handleLogout}>
        <ExitToApp />
        Logout</button>
    </nav>
  );
};

export default AdminNav;
