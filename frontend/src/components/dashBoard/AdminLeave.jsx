import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/leaves", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const data = response.data.leaves.map((leave, index) => {
            const fromDate = new Date(leave.fromDate);
            const toDate = new Date(leave.toDate);

            // Calculate the difference in days
            const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));

            return {
              sno: index + 1,
              empId: leave.employeeId.employeeId,
              name: leave.employeeId.userId.name,
              leaveType: leave.leaveType,
              department: leave.employeeId.department.dep_name,
              days: days,
              status: leave.status,
              action: (
                <button
                  className="px-3 py-1 text-white bg-teal-500 rounded"
                  onClick={() =>
                    navigate(`/admin-dashboard/leaves/${leave._id}`)
                  }
                >
                  View
                </button>
              ),
            };
          });
          setLeaves(data);
          setFilteredLeaves(data);
        }
      } catch (error) {
        alert("Failed to fetch leaves. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = leaves.filter((leave) =>
      leave.empId.toLowerCase().includes(searchValue)
    );
    setFilteredLeaves(filtered);
  };

  const handleFilterStatus = (status) => {
    if (status === "All") {
      setFilteredLeaves(leaves);
    } else {
      const filtered = leaves.filter(
        (leave) => leave.status === status.toLowerCase()
      );
      setFilteredLeaves(filtered);
    }
    setFilterStatus(status);
  };

  const columns = [
    { name: "S No", selector: (row) => row.sno, sortable: true },
    { name: "Emp ID", selector: (row) => row.empId },
    { name: "Name", selector: (row) => row.name },
    { name: "Leave Type", selector: (row) => row.leaveType },
    { name: "Department", selector: (row) => row.department },
    { name: "Days", selector: (row) => row.days },
    { name: "Status", selector: (row) => row.status },
    { name: "Action", cell: (row) => row.action },
  ];

  return (
    <div className="p-5">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold">Manage Leaves</h2>
      </div>

      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Search By Emp ID"
          className="px-4 py-1 border rounded"
          onChange={handleSearch}
        />

        <div className="flex gap-3">
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              className={`px-4 py-1 rounded ${
                filterStatus === status
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={filteredLeaves} pagination />
        )}
      </div>
    </div>
  );
};

export default AdminLeave;
