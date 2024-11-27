import { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    userId: user._id,
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/leave/add`,formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        
      });
      console.log(response);

      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      // Handle the error appropriately
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Request for Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Leave Type Dropdown */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="leaveType"
          >
            Leave Type
          </label>
          <select
            name="leaveType"
            id="leaveType"
            onChange={handleChange}
            value={formData.leaveType}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select Leave Type
            </option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Emergency Leave</option>
          </select>
        </div>

        {/* Date Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="fromDate"
            >
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              id="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="toDate"
            >
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              id="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="reason"
            id="reason"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Reason"
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
            Add Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;
