import Employee from "../models/employee.js";
import Salary from "../models/salaryModel.js"


const addSalary = async (req, res) => {
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body;

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();

        res.status(200).json({success: true, message: "Salary added successfully", data: newSalary})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, error: "Salary adding Server error"})
        
    }
}

// const getSalary = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const salary = await Salary.findById({ employeeId: id}).populate('employeeId','employeeId' )
//         return res.status(200).json({success: true, message: "Salary})
//     } catch (error) {
//         return res.status(500).json({success: false, error: "No salary records found"})
//     }
// }
const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Use findOne to query by employeeId
        let salary = await Salary.find({ employeeId: id }).populate('employeeId');

        if (!salary || salary.length < 1) {
            const employee = await Employee.findOne({userId: id});
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId');
        }

        return res.status(200).json({ success: true, message: "Salary fetched successfully", salary });
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};



export {addSalary, getSalary}