import express from "express";

import { isAuthenticated } from "../middleware/auth.js";
import { createTaskValidator } from "../lib/validators.js";
import { createTask, getAllTasks, updateTask, deleteTask, getSingleTask, getPriorityTask, getTasksDetails } from "../controllers/task.js";

const app = express.Router();

// After here user must be logged in to access the routes
app.use(isAuthenticated);
app.get("/getAllTasks", getAllTasks);
app.get("/getPriorityTasks", getPriorityTask);
app.get("/getTasksDetail", getTasksDetails);
app.post("/createTask", createTaskValidator(), createTask);
app.get("/getSingleTask/:id", getSingleTask);
app.put("/updateTask/:id", updateTask);
app.delete('/deleteTask/:id', deleteTask);

export default app;