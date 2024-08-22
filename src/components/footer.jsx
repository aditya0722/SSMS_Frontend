import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 footer w-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
            <li><Link to="/" className="block  hover:underline">Home</Link></li>
            <li><Link to="/Members" className=" hover:underline">Members</Link></li>
            <li> <Link to="/About" className=" hover:underline">About Us</Link></li>
            <li> <Link to="/Gallery" className="hover:underline">Gallery</Link></li>
            <li> <Link to="/contact" className=" hover:underline">Contact</Link></li>
            <li><Link to="/ConstitutionPage" className="hover:underline">Constitution</Link></li>
            <li> <Link to="/Login" className=" hover:underline">Login</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="mb-2">Samsing Sawali Goan</p>
            <p className="mb-2">Soreng District, Sikkim</p>
            <p className="mb-2">Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          
          {/* Follow Us */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link to="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaFacebookF />
              </Link>
              <Link to="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaTwitter />
              </Link>
              <Link to="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaInstagram />
              </Link>
              <Link to="#" className="text-white hover:text-gray-400 transition duration-300">
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
          
          {/* Developed By */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Developed By</h4>
            <h4 className="mb-2">Aditya Sharma</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/adiityaaaaa" target="blank" className="text-white hover:text-gray-400 transition duration-300">
                <FaFacebookF />
              </a>
              <a href="https://x.com/AdityaS42916257?t=LfopBuFOKdIptC6m-ZIPEQ&s=09" target="blank" className="text-white hover:text-gray-400 transition duration-300">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/addittyaaaaaaa?igsh=aWhrMHRtbTA0eGZ5" target="blank" className="text-white hover:text-gray-400 transition duration-300">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/aditya-sharma-00a258258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="blank" className="text-white hover:text-gray-400 transition duration-300">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 SSMSS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
