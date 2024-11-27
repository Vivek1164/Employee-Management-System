// import Leave from "../models/leaveModel.js";

// const getAllLeaves = async (req, res) => {
//   try {
//     const leaves = await Leave.find()
//     console.log(leaves)

//     if (!leaves) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Leaves not found" });
//     }
//     return res.status(200).json({ success: true, leaves }); // returns all leaves in the database
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "Error retrieving leaves" });
//   }
// };

// export { getAllLeaves };

import Leave from "../models/leaveModel.js";

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
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

    if (!leaves || leaves.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No leaves found" });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error retrieving leaves:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error retrieving leaves" });
  }
};

const getLeaveDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const leave = await Leave.findOne({ _id: id }).populate({
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
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not found" });
    }
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error("Error retrieving leave details:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error retrieving leave details" });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const {status} = req.body;
    console.log(req.body);
    console.log(id);
    const leave = await Leave.findById({ _id: id });
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not found" });
    }
    
    leave.status = status;
    await leave.save();
    return res
      .status(200)
      .json({ success: true, message: "Leave status updated successfully" });
  } catch (error) {
    console.error("Error updating leave status:", error);
    return res
     .status(500)
     .json({ success: false, error: "Error updating leave status" });
  }
};

export { getAllLeaves, getLeaveDetails, updateLeaveStatus };
