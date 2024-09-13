
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title
    });

    try {
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (req.body.title != null) {
            todo.title = req.body.title;
        }
        if (req.body.completed != null) {
            todo.completed = req.body.completed;
        }

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await todo.remove();
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
