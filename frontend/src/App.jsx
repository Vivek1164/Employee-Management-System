import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashBoard/AdminSummary";
import Department from "./components/Departments/Department";
import AddDepartment from "./components/Departments/AddDepartment";
import EditDepartment from "./components/Departments/EditDepartment";
import EmployeeList from "./components/Employee/EmployeeList";
import AddEmployee from "./components/Employee/AddEmployee";
import ViewEmployee from "./components/Employee/ViewEmployee";
import EditEmployee from "./components/Employee/EditEmployee";
import AddSalary from "./components/salary/AddSalary";
import SalaryDetails from "./components/salary/SalaryDetails";
import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/Leaves/LeaveList";
import AddLeave from "./components/Leaves/AddLeave";
import Setting from "./pages/Setting";
import AdminLeave from "./components/dashBoard/AdminLeave";
import ViewPersonLeave from "./components/dashBoard/ViewPersonLeave";
import PerPersonLeave from "./components/Leaves/PerPersonLeave";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<Department />}
          ></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/employees"
            element={<EmployeeList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/:id"
            element={<ViewEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/edit/:id"
            element={<EditEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/salary/add"
            element={<AddSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/salary/:id"
            element={<SalaryDetails />}
          ></Route>
          <Route
            path="/admin-dashboard/leaves"
            element={<AdminLeave />}
          ></Route>
          <Route
            path="/admin-dashboard/leaves/:id"
            element={<ViewPersonLeave />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/leave/:id"
            element={<PerPersonLeave />}
          ></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route
            path="/employee-dashboard/profile/:id"
            index
            element={<ViewEmployee />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/employee-dashboard/add-leave"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/salary/:id"
            element={<SalaryDetails />}
          ></Route>
          <Route
            path="/employee-dashboard/setting"
            element={<Setting />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
