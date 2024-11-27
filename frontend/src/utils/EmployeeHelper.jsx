import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// employee for salry form


export const getEmployees = async (id) => {
    let employees;
    try {
      const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.data.success) {
        employees = response.data.employees;
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
    return employees;
  };


export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white"
        onClick={()=> navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white"
        onClick={()=> navigate(`/admin-dashboard/salary/${_id}`)}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={()=> navigate(`/admin-dashboard/employees/leave/${_id}`)}
      >
        Leave
      </button>
    </div>
  );
};

export const columns = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "100px",
    sortable: true,
    
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px"
    
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px"
    
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true"
  },
];
