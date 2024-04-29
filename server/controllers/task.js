import { validationResult } from "express-validator";
import { Task } from "../models/task.js";

// ============================================================================
const getAllTasks = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 5;
        let skip = (page - 1) * limit;
        const tasks = await Task.find({ user: req.user }).limit(limit).skip(skip);
        res.json(tasks);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

// ============================================================================
const getTasksDetails = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json({ tasks: tasks.length });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}
// ============================================================================
const getPriorityTask = async (req, res) => {
    try {
        let task = await Task.find({ priority: true });
        if (!task) { return res.status(404).send("Task Not Found") }

        task = task.filter((curE) => {
            return curE.user.toString() === req.user
        })

        // // Allow deletion only if user owns this Note
        // if (task.user.toString() !== req.user) {
        //     return res.status(401).send("Not Allowed");
        // }
        res.json(task.reverse())
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

// ============================================================================
const getSingleTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Task Not Found") }

        // Allow deletion only if user owns this Note
        if (task.user.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }
        res.json(task)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

}

// ============================================================================
const createTask = async (req, res) => {
    try {
        const { title, description, date, priority } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const task = new Task({
            title, description, priority, date, user: req.user
        })
        
        const savedTask = await task.save()

        res.json(savedTask)

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

// ============================================================================
const updateTask = async (req, res) => {
    const { title, description, date, priority, status } = req.body;
    try {
        // Create a newNote object
        const newTask = {};
        if (title) { newTask.title = title };
        if (description) { newTask.description = description };
        if (date) { newTask.date = date };
        newTask.priority = priority || false;
        if (status) { newTask.status = status };

        // Find the note to be updated and update it
        let note = await Task.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }
        const task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
        res.json({ task });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

// ============================================================================
const deleteTask = async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Task Not Found") }

        // Allow deletion only if user owns this Note
        if (task.user.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }

        task = await Task.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been deleted", task });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}


export { createTask, getAllTasks, updateTask, deleteTask, getSingleTask, getPriorityTask, getTasksDetails }