import { Outlet } from "react-router-dom";
import SideBar from "../components/EmployeeDashboard/SideBar";
import Navbar from "../components/dashBoard/Navbar";




const EmployeeDashboard = () => {
  return (
    <div className=" flex">
      <SideBar />
      <div className=" flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
