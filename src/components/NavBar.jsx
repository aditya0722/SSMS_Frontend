import React, { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';

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
          <span className="text-xl font-semibold text-gray-800">Community WebApp</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="/" className="text-gray-600 hover:text-blue-900">Home</a>
          <a href="/About" className="text-gray-600 hover:text-gray-900">About Us</a>
          <a href="/Members" className="text-gray-600 hover:text-gray-900">Members</a>
          <a href="/Gallery" className="text-gray-600 hover:text-gray-900">Gallery</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          <a href="/Login" className="text-gray-600 hover:text-gray-900">Login</a>
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
          <a href="/" className="block py-2 px-4 text-gray-600 hover:text-blue-900">Home</a>
          <a href="/About" className="block py-2 px-4 text-gray-600 hover:text-gray-900">About Us</a>
          <a href="/Members" className="block py-2 px-4 text-gray-600 hover:text-gray-900">Members</a>
          <a href="/Gallery" className="block py-2 px-4 text-gray-600 hover:text-gray-900">Gallery</a>
          <a href="/contact" className="block py-2 px-4 text-gray-600 hover:text-gray-900">Contact</a>
          <a href="/Login" className="block py-2 px-4 text-gray-600 hover:text-gray-900">Login</a>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
