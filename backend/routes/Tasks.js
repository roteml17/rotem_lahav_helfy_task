const express = require('express');
const router = express.Router();
const {getAllTasks, createANewTask, deleteTask, updateTask, ToggleTaskCompletionStatus} = require('../data/TaskData')

router.get('/', (req, res) => {
    const response = getAllTasks();
    res.status(200).json(response);
});

router.post('/', (req, res) => {
    const data = req.body;
    const response = createANewTask(data);
    if (!response) {
        ///////todo
    }
    res.status(201);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const response = deleteTask(id);
    if (!response)
        res.status(404);
    else
        res.status(204);
});

router.put('/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const response = updateTask(id, data);
    if (!response)
        res.status(404);
    else
        res.status(200);
}); 

router.patch('/:id/toggle', (req, res) => {
    const id = req.params.id;
    const response = ToggleTaskCompletionStatus(id, data);
    if (!response)
        res.status(404);
    else
        res.status(200);
});

module.exports = router;