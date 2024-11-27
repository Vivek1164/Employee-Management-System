import Employee from "../models/employee.js";
import Department from "../models/department.js";
import Salary from "../models/salaryModel.js";
import Leave from "../models/leaveModel.js";

const getSummary = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const totalSalary = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);

    const employeAppliedLeaves = await Leave.distinct("employeeId");

    const leaveStatus = await Leave.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const leaveSummary = {
      appliedFor: employeAppliedLeaves.length,
      approved: leaveStatus.find((item) => item._id === "approved")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "pending")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalary[0]?.totalSalary || 0,
      leaveSummary,
    });
  } catch (error) {
    console.error("Error getting summary:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error getting summary" });
  }
};

export { getSummary };
