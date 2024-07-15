import React, { useEffect, useState } from 'react';
import { ExitToApp } from '@mui/icons-material';
import { FaBars } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';

const AdminNav = ({ toggleSidebar }) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

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

  return (
    <nav className="bg-white shadow-md text-black p-4 flex items-center justify-evenly">
      {/* Sidebar Toggle (visible only on mobile) */}
      <div className="lg:hidden">
        <button id="sidebarToggle" className=" focus:outline-none" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      {/* Logo and Name */}
      <div className="flex items-center space-x-2">
        <img src="path-to-logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-lg font-semibold">Admin Panel</span>
      </div>
      {/* Spacer to push elements to the right */}
   
      {/* Time and Date */}
      <div className="hidden md:flex items-center space-x-2">
        <FaClock/>
        <span>{time}</span>
        <span>{date}</span>
      </div>
      <div></div>
      <div></div>
      <div></div>
      {/* User Icon and Logout Button */}
      <div className="hidden md:flex items-center space-x-4">
        <img src="path-to-user-icon.png" alt="User Icon" className="h-8 w-8 rounded-full" />
        <span className=" text-lg font-semibold">User Name</span>
      </div>
      
      <button className=" focus:outline-none">
        <ExitToApp/>
        Logout</button>
    </nav>
  );
};

export default AdminNav;
