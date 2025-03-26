const express = require('express');
// const data = require('./data');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const data = [{
    id: 1,
    title: 'Task 1',
    description: 'This is task 1',
    status: 'completed'
}, {
    id: 2,
    title: 'Task 2',
    description: 'This is task 2',
    status: 'completed'
}];

// Get all tasks
// example: http://localhost:3000/tasks
app.get('/tasks', (req, res) => {
    res.json(data);
});

// Get a single task using id
// ex: http://localhost:3000/tasks/1
app.get('/tasks/:id', (req, res) => {
    const task = data.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// Create a new task using post method
// http://localhost:3000/tasks/ with title and description in body
// {    
//     "title": "Creating new Task",    
//     "description": "Task Description"
// }
app.post('/tasks', (req, res) => {
    if (!req.body.title || req.body.title === '') {
        return res.status(400).json({ message: 'Title is required' });
    }

    if (!req.body.description || req.body.description === '') {
        return res.status(400).json({ message: 'Description is required' });
    }
    const task = {
        id: data.length + 1,
        title: req.body.title,
        description: req.body.description,
        status: 'pending'
    };
    data.push(task);
    res.status(201).json(task);
});


// Update a task using task id
// http://localhost:3000/tasks/3 with title and description in body
// {    
//     "title": "Updating third another Task",    
//     "description": "Task Description"
//     "status": "Completed"
// }
app.put('/tasks/:id', (req, res) => {    
    if (!req.body.title || req.body.title === '') {
        return res.status(400).json({ message: 'Title is required' });
    }

    if (!req.body.description || req.body.description === '') {
        return res.status(400).json({ message: 'Description is required' });
    }
    const task = data.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status || 'completed';
    res.json(task);
});

// Delete a task using task id
// http://localhost:3000/tasks/3
// if success then {status: 'success', message: 'Task deleted'} will be returned
// if id not found then { message: 'Task not found' } will be returned
app.delete('/tasks/:id', (req, res) => {
    const task = data.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const index = data.indexOf(task);
    data.splice(index, 1);
    res.json({status: 'success', message: 'Task deleted'});
});

// start server at port 3000
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});



