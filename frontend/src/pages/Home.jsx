import React from "react";
import { motion } from "framer-motion";
import { Users, BarChart, Clock, Shield } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="pt-16">
      <Header />
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div className="md:w-1/2 mb-10 md:mb-0" {...fadeInUp}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Streamline Your Workforce Management
              </h1>
              <p className="text-xl mb-8">
                Powerful, intuitive, and modern employee management solution for
                growing businesses.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold"
                onClick={() => navigate("/login")}
              >
                Get Started Free
              </motion.button>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team Management"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            {...fadeInUp}
          >
            Why Choose StaffSync?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Employee Management",
                description:
                  "Efficiently manage your workforce with our intuitive tools.",
              },
              {
                icon: <BarChart className="h-8 w-8 text-blue-600" />,
                title: "Performance Tracking",
                description:
                  "Monitor and improve employee performance with detailed analytics.",
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "Time Management",
                description:
                  "Track attendance and manage schedules effortlessly.",
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Secure & Reliable",
                description:
                  "Your data is protected with enterprise-grade security.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Leading Companies
            </h2>
            <p className="text-gray-600">
              Join thousands of companies that trust StaffSync
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            ].map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Company ${index + 1}`}
                className="h-20 object-contain mx-auto grayscale hover:grayscale-0 transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
