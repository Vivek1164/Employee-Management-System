import Department from "../models/department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error retrieving departments" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    const newDepartment = new Department({
      dep_name,
      description,
    });
    await newDepartment.save();
    return res.status(200).json({
      success: true,
      department: newDepartment,
      message: "Department added successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error adding department" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    console.log(department);
    return res.status(200).json({ success: true, department: department });
    
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const editDepartment = async (req, res) => {
    try {
      const { id } = req.params;
      const { dep_name, description } = req.body;
      const updatedDepartment = await Department.findByIdAndUpdate(
        { _id: id },
        { dep_name, description }
      );
      return res.status(200).json({
        success: true,
        updatedDepartment,
        message: "Department updated successfully",
      });
    } catch (error) {
      return res
       .status(500)
       .json({ success: false, error: "Error updating department" });
    }
  }

  const deleteDepartment = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const deletedDepartment = await Department.findById({ _id: id });
      await deletedDepartment.deleteOne();
      return res.status(200).json({
        success: true,
        deletedDepartment,
        message: "Department deleted successfully",
      });
    } catch (error) {
      return res
       .status(500)
       .json({ success: false, error: "Error deleting department" });
    }
  };


export { addDepartment, getDepartments, editDepartment,getDepartment, deleteDepartment };
