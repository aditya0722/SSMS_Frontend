import React, { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import {Link} from 'react-router-dom'
const NavBar = () => {
  
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-2" />
          <span className="text-xl font-semibold text-gray-800">SSMSS</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-900">Home</Link>
          <Link to="/About" className="text-gray-600 hover:text-gray-900">About Us</Link>
          <Link to="/Members" className="text-gray-600 hover:text-gray-900">Members</Link>
          <Link to="/Gallery" className="text-gray-600 hover:text-gray-900">Gallery</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          <Link to="/ConstitutionPage" className="text-gray-600 hover:text-gray-900">Constitution</Link>
          <Link to="/Login" className="text-gray-600 hover:text-gray-900">Login</Link>
          
        </nav>
        <button
          className="md:hidden text-gray-600 focus:outline-none btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md a-hover">
          <Link to="/" className="block py-2 px-4 text-gray-600 hover:text-blue-900">Home</Link>
          <Link to="/About" className="block py-2 px-4 text-gray-600 hover:text-gray-900">About Us</Link>
          <Link to="/Members" className="block py-2 px-4 text-gray-600 hover:text-gray-900">Members</Link>
          <Link to="/Gallery" className="block py-2 px-4 text-gray-600 hover:text-gray-900">Gallery</Link>
          <Link to="/contact" className="block py-2 px-4 text-gray-600 hover:text-gray-900">Contact</Link>
          <Link to="/ConstitutionPage" className="block py-2 px-4 text-gray-600 hover:text-gray-900">Constitution</Link>
          <Link to="/Login" className="block py-2 px-4 text-gray-600 hover:text-gray-900">Login</Link>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
