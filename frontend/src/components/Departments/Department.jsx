// import { Link, useNavigate } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelpers";
// import { useEffect, useState } from "react";

// const Department = () => {
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]); // Updated name for clarity
//   const [depLoadings, setDepLoadings] = useState(false);
//   const navigate = useNavigate();

//   const onDepDelete = () => {
//     // const updatedDepartments = departments.filter((dep) => dep._id !== id);
//     // setFilteredDepartments(updatedDepartments);
//     // setDepartments(updatedDepartments);

//     // window.location.reload(false);
//     fetchDepartments();
//   };

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setDepLoadings(true);
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/department",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           const data = response.data.departments.map((dep, index) => ({
//             _id: dep._id,
//             sno: index + 1, // Use index for serial number
//             dep_name: dep.dep_name,
//             action: (
//               <DepartmentButtons _id={dep._id} onDepDelete={onDepDelete} />
//             ),
//           }));
//           setDepartments(data);
//           setFilteredDepartments(data); // Set filtered data for search functionality
//         }
//       } catch (error) {
//         if (
//           error.response &&
//           error.response.data &&
//           error.response.data.error
//         ) {
//           alert(error.response.data.error);
//         } else {
//           alert("Failed to fetch departments. Please try again later.");
//         }
//       } finally {
//         setDepLoadings(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const handleFilterDepartments = (event) => {
//     const records = departments.filter((department) =>
//       department.dep_name
//         .toLowerCase()
//         .includes(event.target.value.toLowerCase())
//     );
//     setFilteredDepartments(records); // Update filtered data
//   };

//   return (
//     <div className="p-5">
//       <div className="text-center">
//         <h3 className="text-2xl font-bold">Manage Department</h3>
//       </div>
//       <div className="flex justify-between items-center my-4">
//         <input
//           type="text"
//           placeholder="Search by Dep name.."
//           className="px-4 py-0.5 border"
//           onChange={handleFilterDepartments} // Updated function name
//         />
//         <Link
//           to="/admin-dashboard/add-department"
//           className="px-4 py-1 bg-teal-600 rounded text-white"
//         >
//           Add New Department
//         </Link>
//       </div>
//       {depLoadings ? (
//         <p>Loading departments...</p>
//       ) : (
//         <div className="mt-5">
//           <DataTable columns={columns} data={filteredDepartments} pagination />{" "}
//           {/* Updated state variable */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Department;

import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelpers";
import { useEffect, useState, useCallback } from "react";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [depLoadings, setDepLoadings] = useState(false);

  const fetchDepartments = useCallback(async () => {
    setDepLoadings(true);
    try {
      const response = await axios.get("http://localhost:3000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        const data = response.data.departments.map((dep, index) => ({
          _id: dep._id,
          sno: index + 1,
          dep_name: dep.dep_name,
          action: <DepartmentButtons _id={dep._id} onDepDelete={onDepDelete} />,
        }));
        setDepartments(data);
        setFilteredDepartments(data); // For search functionality
      }
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "Failed to fetch departments. Please try again later."
      );
    } finally {
      setDepLoadings(false);
    }
  }, []);

  const onDepDelete = useCallback(
    (id) => {
      // Handle delete API request here if necessary
      fetchDepartments();
    },
    [fetchDepartments]
  );

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleFilterDepartments = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const records = departments.filter((department) =>
      department.dep_name.toLowerCase().includes(searchTerm)
    );
    setFilteredDepartments(records);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Department</h3>
      </div>
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search by Dep name.."
          className="px-4 py-0.5 border"
          onChange={handleFilterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
      {depLoadings ? (
        <p>Loading departments...</p>
      ) : (
        <div className="mt-5">
          <DataTable columns={columns} data={filteredDepartments} pagination />
        </div>
      )}
    </div>
  );
};

export default Department;
