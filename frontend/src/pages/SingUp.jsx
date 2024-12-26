import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const nameChange = (event) => {
    setname(event.target.value);
  };

  const passwordChange = (event) => {
    setpassword(event.target.value);
  };

  const emailChange = (event) => {
    setemail(event.target.value);
  };

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    console.log(name, email, password);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, email, password }
      );

      const result = await response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Registration failed");
      }

      alert("Registration Successful");
      setname("");
      setemail("");
      setpassword("");
      navigate("/login");

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <motion.div
        className="flex justify-center items-center min-h-screen bg-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Create Account
          </h2>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  required
                  value={name}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={nameChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={email}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={emailChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={password}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={passwordChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Create Account
            </button>
          </form>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default SingUp;
