import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import autRouter from "./routes/auth.js";
import connectToDB from "./db/db.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leaves.js";
import settingRouter from "./routes/setting.js";
import manageLeaveRouter from "./routes/manageLeaves.js";
import dashBoardRouter from "./routes/dashboard.js";

connectToDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

app.use("/api/auth", autRouter);
app.use("/api/department", departmentRouter);

app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);

app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter)

app.use("/api/leaves", manageLeaveRouter)

app.use("/api/dashboard", dashBoardRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
