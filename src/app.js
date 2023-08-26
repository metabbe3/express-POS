const express = require('express');
const routes = require('./routes');
const { PORT } = require('./config/env');
const logger = require('./utils/logger');

const app = express();

// Middlewares
app.use(express.json()); // For JSON body parsing

// Logging middleware
app.use((req, res, next) => {
    //console.log('Headers:', req.headers); // Log headers
    //console.log('Body:', req.body); // Log body
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Use the routes
app.use('/api', routes);  // prefix routes with /api

// Handling 404
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    if (process.env.NODE_ENV === 'development') {
        res.status(500).send(`Something broke! Error: ${err.message}`);
    } else {
        res.status(500).send('Something broke!');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app, PORT };
