const userRoutes = require('./users');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('Welcome, please navigate to /users to read userdata.');
    });

    userRoutes(app, fs);
};

module.exports = appRouter;
