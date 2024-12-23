const express = require('express');
const Task = require('../models/Task');  // Import the Task model
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();  // Fetch all tasks from the database
        res.json(tasks);  // Send tasks as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });  // Internal server error
    }
});

// Add a new task
router.post('/', async (req, res) => {
    const task = new Task({
        text: req.body.text,  // Get the text for the new task from the request body
    });

    try {
        const newTask = await task.save();  // Save the task in the database
        res.status(201).json(newTask);  // Respond with the created task
    } catch (err) {
        res.status(400).json({ message: err.message });  // Invalid input error
    }
});


// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);  // Find the task by ID
        if (!task) return res.status(404).json({ message: 'Task not found' });  // If not found, return 404

        // Update the task fields if provided
        task.text = req.body.text || task.text;  // Update text, or leave it the same if not provided
        task.completed = req.body.completed ?? task.completed;  // Update completed status, if provided

        const updatedTask = await task.save();  // Save the updated task
        res.json(updatedTask);  // Return the updated task
    } catch (err) {
        res.status(400).json({ message: err.message });  // Invalid input error
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);  // Find and delete the task by ID
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });  // Task not found
        }
        res.json({ message: 'Task deleted successfully' });  // Return success message
    } catch (err) {
        res.status(500).json({ message: err.message });  // Server error
    }
});

module.exports = router;  // Export the router
