import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PerPersonLeave = () => {
  const { id } = useParams();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leave/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          // Add sno to each leave object
          const leavesWithSno = response.data.leaves.map((leave, index) => ({
            ...leave,
            sno: index + 1, // Assign serial number
          }));
          setLeaves(leavesWithSno);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
      setLoading(false);
    };
    fetchLeaves();
  }, [id]);

  const columns = [
    { name: "S No", selector: (row) => row.sno, sortable: true },
    { name: "Emp ID", selector: (row) => row.employeeId.employeeId },
    { name: "Name", selector: (row) => row.employeeId.userId.name },
    { name: "Leave Type", selector: (row) => row.leaveType },
    {
      name: "Department",
      selector: (row) => row.employeeId.department.dep_name,
    },

    { name: "Status", selector: (row) => row.status },
  ];

  return (
    <div className="p-5">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold">employee Leaves details</h2>
      </div>

      <div className="mt-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={leaves} pagination />
        )}
      </div>
    </div>
  );
};

export default PerPersonLeave;
