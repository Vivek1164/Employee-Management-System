import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ViewPersonLeave = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null); // Track the status message

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leaves/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const fetchedLeave = response.data.leave;
          setLeave(fetchedLeave);

          // Check if the leave is already approved/rejected and set the status message
          if (
            fetchedLeave.status === "approved" ||
            fetchedLeave.status === "rejected"
          ) {
            setStatusMessage(fetchedLeave.status);
          }
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          !error.response.data.success
        ) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const updateLeaveStatus = async (status) => {
    try {
      const updatedLeave = {
        status, // Update the status to "approved" or "rejected"
      };

      const response = await axios.put(
        `http://localhost:3000/api/leaves/${id}`,
        updatedLeave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // Update the leave state and show the status message
        setLeave((prevLeave) => ({
          ...prevLeave,
          status, // Update the status in the state
        }));
        setStatusMessage(status); // Set the status message (approved or rejected)
        navigate(`/admin-dashboard/leaves`); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:3000/public/uploads/${leave.employeeId.userId.profileImage}`}
                className="rounded-full border w-72 h-72 object-cover"
                alt="Profile"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name: </p>
                <p className="font-medium">{leave.employeeId.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Leave Type: </p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Reason: </p>
                <p className="font-medium">{leave.reason}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department: </p>
                <p className="font-medium">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Start Date: </p>
                <p className="font-medium">
                  {new Date(leave.fromDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">End Date: </p>
                <p className="font-medium">
                  {new Date(leave.toDate).toLocaleDateString()}
                </p>
              </div>

              {/* Conditionally render the message or buttons */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Action: </p>
                <div className="flex justify-between gap-4">
                  {statusMessage ? (
                    <p
                      className={`font-medium ${
                        statusMessage === "approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {statusMessage.toUpperCase()}{" "}
                      {/* Show the status message */}
                    </p>
                  ) : (
                    <>
                      <button
                        onClick={() => updateLeaveStatus("approved")}
                        className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateLeaveStatus("rejected")}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPersonLeave;
