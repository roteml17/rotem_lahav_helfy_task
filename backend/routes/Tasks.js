const express = require('express');
const router = express.Router();
const {getAllTasks, createANewTask, deleteTask, updateTask, ToggleTaskCompletionStatus} = require('../data/TaskData')

router.get('/', (req, res) => {
    const response = getAllTasks();
    if (!response)
        return res.status(500).json({ message: 'Failed to fetch tasks' });
    return res.status(200).json(response);
});

router.post('/', (req, res) => {
    const { title, description, priority } = req.body;

    if (title.trim() === '')
        return res.status(400).json({ message: 'title is required and must be a non-empty string' });
    if (description.trim() === '')
        return res.status(400).json({ message: 'description is required and must be a non-empty string' });
    
    const allowedPriorities = ['low', 'medium', 'high'];
    if (!allowedPriorities.includes(priority))
        return res.status(400).json({ message: 'priority is required and must be one of: low, medium, high' });

    const response = createANewTask({ title, description, priority });
    if (!response)
        return res.status(500).json({ message: 'Failed to create task' });
    return res.status(201);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const response = deleteTask(id);
    if (!response)
        return res.status(404).json({ message: 'task was not found' });
    else
        return res.status(204).json({ message: 'task was deleted successfuly' });
});

router.put('/:id', (req, res) => {
    const { title, description, priority } = req.body;
    const id = req.params.id;

    if (title.trim() === '')
        return res.status(400).json({ message: 'title is required and must be a non-empty string' });
    if (description.trim() === '')
        return res.status(400).json({ message: 'description is required and must be a non-empty string' });
    
    const allowedPriorities = ['low', 'medium', 'high'];
    if (!allowedPriorities.includes(priority))
        return res.status(400).json({ message: 'priority is required and must be one of: low, medium, high' });

    const response = updateTask(id, { title, description, priority });
    if (!response)
        return res.status(404).json({ message: 'task was not found' });
    else
        return res.status(200).json({ message: 'task was updated found' });
}); 

router.patch('/:id/toggle', (req, res) => {
    const id = req.params.id;
   
    const response = ToggleTaskCompletionStatus(id, data);
    if (!response)
        return res.status(404).json({ message: 'task was not found' });
    else
        return res.status(200).json({ message: 'task was updated found' });
});

module.exports = router;