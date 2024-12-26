import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">StaffSync</h3>
            <p className="text-gray-400">
              Empowering businesses with smart employee management solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>vivekkumar@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91-7503710648</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Business Ave, Suite 100</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="hover:text-blue-400"
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="hover:text-blue-400"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="hover:text-blue-400"
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 StaffSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
