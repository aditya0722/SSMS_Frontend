import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 footer w-screen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
            <li><a href="/" className="block  hover:underline">Home</a></li>
            <li><a href="/Members" className=" hover:underline">Members</a></li>
            <li> <a href="/About" className=" hover:underline">About Us</a></li>
            <li> <a href="/Gallery" className="hover:underline">Gallery</a></li>
            <li> <a href="/contact" className=" hover:underline">Contact</a></li>
            <li> <a href="/Login" className=" hover:underline">Login</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="mb-2">123 Main Street</p>
            <p className="mb-2">City, State 12345</p>
            <p className="mb-2">Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          
          {/* Follow Us */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          {/* Developed By */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Developed By</h4>
            <h4 className="mb-2">Aditya Sharma</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
