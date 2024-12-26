import React from "react";
import { motion } from "framer-motion";
import { Users, LogIn, UserPlus, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">StaffSync</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Sign Up
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
