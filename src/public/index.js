const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(bodyParser.json());

const makeFile = name => {
    return path.resolve(__dirname, 'views', name);
};

app.get('/', (req, res) => {
    res.sendFile(makeFile("junior.html"));
});

app.get('/s', (req, res) => {
    res.sendFile(makeFile('senior.html'));
});

const todos = ['todo1', 'todo2', 'todo3'];

app.get('/todos', (req, res) => {
    return res.json(todos);
});

app.post('/todos', (req, res) => {
    todos.push(req.body.todo);
    return res.json(todos);
});