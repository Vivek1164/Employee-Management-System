import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { EmployeeButtons } from "../../utils/EmployeeHelper";
import { columns } from "../../utils/EmployeeHelper";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoadings, setEmpLoadings] = useState(false);
  const [filterEmployees, setFilterEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoadings(true);
      try {
        const response = await axios.get("http://localhost:3000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.data.success) {
          const data = response.data.employees.map((emp, index) => ({
            _id: emp._id,
            sno: index + 1, // Use index for serial number
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className=" rounded-full"
                src={`http://localhost:3000/public/uploads/${emp.userId.profileImage}`}
              />
            ),
            action: <EmployeeButtons _id={emp._id} />,
          }));
          setEmployees(data);
          setFilterEmployees(data); // Keep original data for filter
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(error.response.data.error);
        } else {
          alert("Failed to fetch Employees. Please try again later.");
        }
      } finally {
        setEmpLoadings(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterEmployees(records);
  };

  return (
    <div className=" px-5">
      <div className=" text-center">
        <h3 className=" text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className=" flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search by employee name"
          className=" px-4 py-0.5 border"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className=" px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add new employee
        </Link>
      </div>
      <div className=" mt-5">
        <DataTable columns={columns} data={filterEmployees} pagination />
      </div>
    </div>
  );
};

export default EmployeeList;
