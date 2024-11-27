// import { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/authContext";
// import { Navigate, useNavigate } from "react-router-dom";
// import image from "./12210166.png";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Email: ", email, " Password: ", password);
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/login",
//         { email, password }
//       );
//       if (response.data.success) {
//         alert("Login Successful");
//         setError(null);
//         login(response.data.user);
//         localStorage.setItem("token", response.data.token);
//         if (response.data.user.role === "admin") {
//           navigate("/admin-dashboard");
//         } else {
//           navigate("/employee-dashboard");
//         }
//       }
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//       if (error.response && !error.response.data.success) {
//         setError(error.response.data.message);
//       } else {
//         setError("Server Error");
//       }
//     }
//   };

//   return (
//     <div className=" bg-gradient-to-b from-teal-600 to-gray-100 space-y-6">
//       <div className="  items-center p-5">
//         <h1 className="text-center underline font-sevillana text-5xl text-white font-extrabold">
//           Employee Management
//         </h1>
//         <h1 className="text-center underline font-sevillana text-5xl text-white font-extrabold">
//           System
//         </h1>
//       </div>
//       <div className="flex justify-center items-center gap-2 ">
//         <div className="flex justify-center items-end w-2/3">
//           <img src={image} alt="" />
//         </div>
//         <div className="flex flex-col  justify-center w-1/3">
//           <div className="border shadow p-6 w-80 bg-white rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Login</h2>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-gray-700">
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter your email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="password" className="block text-gray-700">
//                   Password:
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter your password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="flex items-center justify-between mb-4">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox text-green-500"
//                   />
//                   <span className="ml-2 text-gray-700">Remember me</span>
//                 </label>
//                 <a href="#" className="text-sm text-teal-500 hover:underline">
//                   Forgot password?
//                 </a>
//               </div>
//               <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;











import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import image from "./12210166.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        alert("Login Successful");
        setError(null);
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate(response.data.user.role === "admin" ? "/admin-dashboard" : "/employee-dashboard");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.message);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-600 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
          Employee Management System
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Image Section */}
        <div className="hidden lg:block">
          <img src={image} alt="Login Illustration" className="max-w-lg rounded-lg shadow-lg" />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          <h2 className="text-4xl font-bold text-teal-600 mb-6 text-center">Login</h2>
          {error && (
            <p className="text-red-500 bg-red-100 border border-red-400 rounded-lg p-2 text-sm mb-4">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between mb-6 gap-6">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-teal-500 mt-1" />
                <span className="ml-1 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-teal-500 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
