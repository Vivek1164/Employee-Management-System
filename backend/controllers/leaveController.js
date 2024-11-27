import Leave from "../models/leaveModel.js";
import Employee from "../models/employee.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, fromDate, toDate, reason } = req.body;

    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    await newLeave.save();

    res.status(200).json({
      success: true,
      message: "Leave added successfully",
      data: newLeave,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, error: "Leave adding Server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ userId: id });

    const leaves = await Leave.find({ employeeId: employee._id });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, error: "Server error in fetching leaves" });
  }
};

const getEmployeeLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const leaves = await Leave.find({ employeeId: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "userId",
          select: "-password",
        },
        {
          path: "department",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error: "Server error in fetching employee leaves",
    });
  }
};

export { addLeave, getLeaves, getEmployeeLeaves };
