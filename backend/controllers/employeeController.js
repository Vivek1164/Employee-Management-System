import Employee from "../models/employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from "../models/department.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      department,
      designation,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();
    return res
      .status(200)
      .json({ success: true, message: "Employee saved successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Server Error in adding empployee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error retrieving employees" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error retrieving employee" });
  }
};

// const updateEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, maritalStatus, department, designation, salary } = req.body;

//     const employee = await Employee.findByIdAndUpdate(id);
//     if (!employee) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Employee not found" });
//     }

//     const user = await User.find({ _id: employee.userId });
//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     const updateUser = await User.findByIdAndUpdate(
//       { _id: employee.userId },
//       { name }
//     );
//     const updateEmployee = await User.findByIdAndUpdate(
//       { _id: id },
//       {
//         maritalStatus,
//         department,
//         designation,
//         salary,
//       }
//     );

//     if (!updateEmployee || !updateUser) {
//       return res
//         .status(500)
//         .json({ success: false, error: "document not found" });
//     }

//     return res
//       .status(200)
//       .json({ success: true, message: "Employee updated successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "Error updating employee" });
//   }
// };

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, department, designation, salary } = req.body;

    // Find the employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    // Find the associated user by employee's userId
    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Update the user (name)
    const updatedUser = await User.findByIdAndUpdate(
      employee.userId,
      { name },
      { new: true } // Return the updated document
    );

    // Update the employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { maritalStatus, department, designation, salary },
      { new: true } // Return the updated document
    );

    if (!updatedEmployee || !updatedUser) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to update records" });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating employee:", error); // Log the error for debugging
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const fetchEmployeesByDeptId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id });

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error retrieving employeeById" });
  }
};

export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDeptId,
};
