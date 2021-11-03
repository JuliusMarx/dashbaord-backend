const express = require('express');
const fs = require("fs");
const app = express();

// variables
const dataPath = './data/users.json';

app.get('/', (req, res) => {
    res.send('Welcome, please navigate to /api/users to read userdata.')
})

app.get('/api/users', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        res.send(JSON.parse(data));
    });
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`)
)
