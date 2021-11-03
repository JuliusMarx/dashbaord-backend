const Joi = require('joi');
const express = require('express');
const fs = require("fs");

const app = express();
app.use(express.json());

// variables
const dataPath = './data/users.json';
const users = [
    { id: 1, name: 'user1' },
    { id: 2, name: 'user3' },
    { id: 3, name: 'user2' }
];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome, please navigate to /api/users to read userdata.')
})

app.get('/api/users', (req, res) => {
    /*fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });*/

    res.send(users);
});

// conv for specific user endpoint: /api/users/1
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('User not found'); // 404
    res.send(user)
});

// create a new user
app.post('/api/users', (req, res) => {

    // validate user
    const { error } = validateUser(req.body); // object destructuring for result.err
    // If invalid, return 400
    if (error) return res.status(400).send(error.error.details[0].message);

    const user = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(user);
    res.send(user);
});

// update a user
app.put('/api/users/:id', (req, res) => {
    // Look up user
    const user = users.find(u => u.id === parseInt(req.params.id))
    // if not existing, return 404
    if (!user) return res.status(404).send('User not found');

    // validate user
    const { error } = validateUser(req.body); // object destructuring for result.err
    // If invalid, return 400
    if (error) return res.status(400).send(error.error.details[0].message);

    // Update user
    user.name = req.body.name;
    // Return the updated user
    res.send(user);
});

// delete a user
app.delete('/api/users/:id', (req, res) => {
    // Look up user
    const user = users.find(u => u.id === parseInt(req.params.id))
    // if not existing, return 404
    if (!user) return res.status(404).send('User not found');

    // Delete user
    const index = users.indexOf(user);
    users.splice(index, 1);
    // Return the deleted user
    res.send(user);
});

//PORT
const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`)
)

function validateUser(user) {
    // Validate user
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(user, schema)
}
