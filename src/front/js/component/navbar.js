import React from "react";
import { Link } from 'react-router-dom';
import { Home, BarChart2, LogIn, UserPlus } from 'lucide-react';
import logoimagen from '../../img/logos/logoblanco.png';

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-full shadow-2xl px-8 py-4 z-50">
      <div className="flex items-center justify-between space-x-8">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logoimagen} alt="Logo" className="w-15 h-20" />
        </Link>
        <ul className="flex items-center space-x-8">
        <li>
          <Link
            to="/about-us"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <i className="fa-solid fa-people-group w-5 h-5"></i>
            <span className="text-sm font-medium">Quienes Somos</span>
          </Link>
        </li>

          <li>
            <Link to="/signup-smoker" className="flex items-center space-x-2 bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-full transition-colors duration-200 text-sm">
              <UserPlus className="w-4 h-4" />
              <span>Empieza ya</span>
            </Link>
          </li>
          <li>
            <Link to="/login-selection" className="flex items-center space-x-2 bg-transparent hover:bg-white hover:bg-opacity-10 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200 border border-white text-sm">
              <LogIn className="w-4 h-4" />
              <span>Inicia sesión</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}