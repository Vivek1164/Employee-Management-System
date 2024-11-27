import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name: "S No.",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
];

export const DepartmentButtons = ({ _id , onDepDelete}) => {
    const navigate = useNavigate();

    const handleDelete = async (_id) => {
        if (!window.confirm("Are you sure you want to delete this department?")) {
            return; // Exit if user cancels deletion
        }
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/department/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Department deleted successfully!");
                onDepDelete(); 
                 // Navigate to the department list or reload data
            }
        } catch (error) {
            alert(
                error.response?.data?.error ||
                "Failed to delete department. Please try again."
            );
        }
    };


    
    


    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-600 text-white"
                onClick={() => handleDelete(_id)} // Pass `_id` to the function
            >
                Delete
            </button>
        </div>
    );
};
